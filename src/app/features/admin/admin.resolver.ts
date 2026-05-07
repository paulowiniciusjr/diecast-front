import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { AdminDashboardData } from './models/admin-stats.model';

@Injectable({ providedIn: 'root' })
export class AdminStatsResolver implements Resolve<AdminDashboardData> {

  constructor(private adminService: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AdminDashboardData> {
    return this.adminService.getAdminDashboard();
  }
}

