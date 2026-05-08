import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserWithVehicles } from '../models/admin-stats.model';

export interface UserFormData {
  username: string;
  email: string;
  phone?: string;
  password?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private readonly API = `${environment.apiUrl}admin/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserWithVehicles[]> {
    return this.http.get<UserWithVehicles[]>(`${this.API}`);
  }

  getUserById(id: number): Observable<UserWithVehicles> {
    return this.http.get<UserWithVehicles>(`${this.API}/${id}`);
  }

  createUser(userData: UserFormData): Observable<UserWithVehicles> {
    return this.http.post<UserWithVehicles>(`${this.API}`, userData);
  }

  updateUser(id: number, userData: UserFormData): Observable<UserWithVehicles> {
    return this.http.put<UserWithVehicles>(`${this.API}/${id}`, userData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  checkUsernameAvailable(username: string, excludeId?: number): Observable<boolean> {
    const params = excludeId ? `?excludeId=${excludeId}` : '';
    return this.http.get<{ available: boolean }>(`${this.API}/check-username/${username}${params}`)
      .pipe(
        switchMap(res => of(res.available)),
        catchError(() => of(false))
      );
  }

  checkEmailAvailable(email: string, excludeId?: number): Observable<boolean> {
    const params = excludeId ? `?excludeId=${excludeId}` : '';
    return this.http.get<{ available: boolean }>(`${this.API}/check-email/${email}${params}`)
      .pipe(
        switchMap(res => of(res.available)),
        catchError(() => of(false))
      );
  }

  getAvailableRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/roles`).pipe(
      catchError(() => of(['USER', 'ADMIN']))
    );
  }
}
