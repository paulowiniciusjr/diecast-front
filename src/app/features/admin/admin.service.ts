import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminDashboardData } from './models/admin-stats.model';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private readonly API = `${environment.apiUrl}api/dashboard`;

  constructor(private http: HttpClient) {}

  getAdminDashboard(): Observable<AdminDashboardData> {
    return this.http.get<AdminDashboardData>(`${this.API}/admin`);
  }

}
