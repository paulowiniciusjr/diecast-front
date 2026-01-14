import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './models/vehicle.model';


@Injectable({ providedIn: 'root' })
export class VehiclesResolver implements Resolve<Vehicle[]> {

  constructor(private service: VehiclesService) {}

  resolve(): Observable<Vehicle[]> {
    return this.service.getAll();
  }
}
