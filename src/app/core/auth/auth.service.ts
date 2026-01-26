import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { TokenService } from './token.service';
import { AuthMeResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly API = `${environment.apiUrl}auth`;
  
  isAuthenticated = signal<boolean>(false);
  
  private meSubject = new BehaviorSubject<AuthMeResponse | null>(null);
  me$ = this.meSubject.asObservable();  
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService
  ) {
    this.isAuthenticated.set(this.tokenService.isValid());
    console.log('API: ', environment.apiUrl);
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
        this.loadMe();
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.isAuthenticated.set(false);
  }

  loadMe() {
    return this.http.get<AuthMeResponse>(`${this.API}/me`)
      .subscribe(me => this.meSubject.next(me));
  }

  isAdmin(): boolean {
    return this.meSubject.value?.role === 'ADMIN';
  }

  isUser(): boolean {    
    return this.meSubject.value?.role === 'USER';
  }  
  
}
