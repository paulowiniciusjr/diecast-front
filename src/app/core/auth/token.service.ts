import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';


const TOKEN_KEY = 'diecast_token';
const EXPIRES_KEY = 'diecast_expires_at';

@Injectable({ providedIn: 'root' })
export class TokenService {

  constructor(private storage: StorageService) {}

  save(token: string, expiresIn: number): void {
    const expiresAt = Date.now() + expiresIn * 1000;

    this.storage.set(TOKEN_KEY, token);
    this.storage.set(EXPIRES_KEY, expiresAt.toString());
  }

  get(): string | null {
    return this.storage.get(TOKEN_KEY);
  }

  isExpired(): boolean {
    const expiresAt = this.storage.get(EXPIRES_KEY);
    if (!expiresAt) return true;

    return Date.now() > Number(expiresAt);
  }

  clear(): void {
    this.storage.remove(TOKEN_KEY);
    this.storage.remove(EXPIRES_KEY);
  }

  isValid(): boolean {
    return !!this.get() && !this.isExpired();
  }
}
