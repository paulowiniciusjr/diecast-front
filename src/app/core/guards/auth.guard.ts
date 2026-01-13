import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { diecastConstants } from '../../constants.diecast';


export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const token = storage.get(diecastConstants.TOKEN);

  if (token) {
    return true; // ✅ usuário autenticado
  }

  // ❌ não autenticado
  router.navigate(['/login']);
  return false;
};
