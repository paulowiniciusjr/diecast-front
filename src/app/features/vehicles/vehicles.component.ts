import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.model';

@Component({
  standalone: true,
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {

  vehicles = signal<Vehicle[]>([]);
  loading = signal(true);
  error = signal(false);

  constructor(private service: VehiclesService) {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.service.findAll().subscribe({
      next: (data: Vehicle[]) => {
        this.vehicles.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
