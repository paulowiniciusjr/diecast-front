import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle.model';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'vehicle-list.component.html'
})
export class VehicleListComponent {

  @Input() vehicles: Vehicle[] = [];

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() remove = new EventEmitter<Vehicle>();
}
