import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { VehiclesResolver } from './features/vehicles/vehicles.resolver';
import { AdminStatsResolver } from './features/admin/admin.resolver';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./features/vehicles/vehicles.component')
            .then(m => m.VehiclesComponent),
        resolve: {
          vehicles: VehiclesResolver
        }
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component')
            .then(m => m.AdminDashboardComponent),
        resolve: {
          data: AdminStatsResolver
        }
      }
    ]
  },

  { path: '**', redirectTo: 'vehicles' }
];
