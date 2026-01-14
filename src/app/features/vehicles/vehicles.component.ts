import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { Vehicle } from './models/vehicle.model';
import { VehiclesService } from './vehicles.service';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  imports: [
    CommonModule,
    VehicleListComponent,
    VehicleFormComponent,
    ConfirmDialogComponent
  ]
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];
  selectedVehicle?: Vehicle;
  showForm = false;
  vehicleToDelete?: Vehicle

  constructor(private service: VehiclesService, private router: ActivatedRoute) {
    this.vehicles = [...this.router.snapshot.data['vehicles']];
  }

  ngOnInit(): void {
  }

  create(): void {
    this.selectedVehicle = undefined;
    this.showForm = true;
  }

  edit(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.showForm = true;
  }

  onSave(vehicle: Vehicle) {

    const request$ = vehicle.id
      ? this.service.update(vehicle.id, vehicle)
      : this.service.create(vehicle);

    request$.subscribe(saved => {

      this.vehicles = vehicle.id
        ? this.vehicles.map(v => v.id === saved.id ? saved : v)
        : [...this.vehicles, saved];

      this.showForm = false;
    });
  }

  onCancel(): void {
    this.showForm = false;
  }

  askDelete(vehicle: Vehicle) {
    console.log('askDelete', vehicle);
    this.vehicleToDelete = vehicle;
  }

  confirmDelete() {
    console.log('confirmDelete');
    setTimeout(() => {
      if (!this.vehicleToDelete) return;

      this.service.delete(this.vehicleToDelete.id!).subscribe(() => {
        this.vehicles = this.vehicles.filter(
          v => v.id !== this.vehicleToDelete!.id
        );
        this.vehicleToDelete = undefined;
      });
    }, 1000);

  }

  cancelDelete() {
    this.vehicleToDelete = undefined;
  }



  /*ngOnDestroy() {
    this.sub?.unsubscribe();
  } */
}


