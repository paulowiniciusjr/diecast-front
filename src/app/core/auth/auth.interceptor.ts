import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';
import { StorageService } from '../storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const storage = inject(StorageService);
  const token = storage.get('diecast_token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
