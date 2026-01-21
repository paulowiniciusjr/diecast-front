import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = `${environment.apiUrl}auth`;

  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService
  ) {
    this.isAuthenticated.set(this.tokenService.isValid());
  }

  login(username: string, password: string) {

    console.log('LOGIN SERVICE CHAMADO', username);

    return this.http.post<any>(`${this.API}/login`, {
      username,
      password
    }).pipe(
      tap(response => {        
        this.tokenService.save(response.token, response.expiresIn);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.isAuthenticated.set(false);
  }
  
}
