import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle.model';
import { AuthService } from '../../../../core/auth/auth.service';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadMe();
  }

  @Input() vehicles: Vehicle[] = [];

  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() remove = new EventEmitter<Vehicle>();
}
