import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AdminService } from './admin.service';
import { AdminDashboardData } from './models/admin-stats.model';

@Injectable({ providedIn: 'root' })
export class AdminStatsResolver implements Resolve<AdminDashboardData> {

  constructor(private adminService: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AdminDashboardData> {
    return forkJoin({
      stats: this.adminService.getStats(),
      users: this.adminService.getUsers(),
      vehicleStats: this.adminService.getVehicleStats()
    });
  }
}
