import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { Vehicle } from './models/vehicle.model';
import { VehiclesService } from './vehicles.service';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';
import { finalize } from 'rxjs';
import { ToastService } from '../../core/toast/toast.service';

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
  vehicleToDelete?: Vehicle;
  loading = false;
  message = '';
  submitting = false;


  constructor(private service: VehiclesService,
    private router: ActivatedRoute,
    private toast: ToastService) {
    this.vehicles = [...this.router.snapshot.data['vehicles']];
  }

  ngOnInit(): void {
  }


  loadVehicles(): void {
    this.loading = true;

    this.service.getAll().subscribe({
      next: data => this.vehicles = data,
      error: () => {        
        this.toast.showError('Erro ao carregar veículos.');
      },
      complete: () => this.loading = false
    });
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
    this.submitting = true;

    const request$ = vehicle.id
      ? this.service.update(vehicle.id, vehicle)
      : this.service.create(vehicle);

    request$
      .pipe(
        finalize(() => {
          // GARANTIA ABSOLUTA
          this.submitting = false;
        })
      )
      .subscribe({
        next: saved => {
          if (vehicle.id) {
            this.vehicles = this.vehicles.map(v =>
              v.id === saved.id ? saved : v
            );
            this.toast.showSuccess('Veículo atualizado com sucesso.');
          } else {
            this.vehicles = [...this.vehicles, saved];
            this.toast.showSuccess('Veículo cadastrado com sucesso.');
          }

          // ⬅️ VOLTA PARA LISTA
          this.showForm = false;          
        },
        error: () => {
          this.toast.showError('Erro ao salvar veículo.');
        }

      });
  }


  onCancel(): void {
    this.clearMessage();
    this.submitting = false;
    this.showForm = false;
  }

  askDelete(vehicle: Vehicle) {
    console.log('askDelete', vehicle);
    this.vehicleToDelete = vehicle;
  }

  confirmDelete() {
    //console.log('confirmDelete');
    //setTimeout(() => {
    if (!this.vehicleToDelete) return;

    this.service.delete(this.vehicleToDelete.id!).subscribe(() => {
      this.vehicles = this.vehicles.filter(
        v => v.id !== this.vehicleToDelete!.id
      );
      this.vehicleToDelete = undefined;
    });
    //}, 1000);

  }

  cancelDelete() {
    this.vehicleToDelete = undefined;
  }

  clearMessage(): void {
    this.message = '';
  }


}


