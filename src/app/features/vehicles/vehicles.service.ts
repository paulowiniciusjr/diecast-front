import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehiclesService {

  private readonly API = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.API);
  }
}
