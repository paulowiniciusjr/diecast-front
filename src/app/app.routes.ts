import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { VehiclesResolver } from './features/vehicles/vehicles.resolver';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
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
      }
    ]
  },

  { path: '**', redirectTo: 'vehicles' }
];
