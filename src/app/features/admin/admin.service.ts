import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminStats, UserWithVehicles, VehicleStatsData, AdminDashboardData } from './models/admin-stats.model';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private readonly API = `${environment.apiUrl}admin`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    // TODO: Replace with real API call
    // return this.http.get<AdminStats>(`${this.API}/stats`);
    return of(this.getMockStats());
  }

  getUsers(): Observable<UserWithVehicles[]> {
    // TODO: Replace with real API call
    // return this.http.get<UserWithVehicles[]>(`${this.API}/users`);
    return of(this.getMockUsers());
  }

  getVehicleStats(): Observable<VehicleStatsData> {
    // TODO: Replace with real API call
    // return this.http.get<VehicleStatsData>(`${this.API}/vehicles/stats`);
    return of(this.getMockVehicleStats());
  }

  private getMockStats(): AdminStats {
    return {
      userCount: 15,
      vehicleCount: 87
    };
  }

  private getMockUsers(): UserWithVehicles[] {
    const names = ['Paulo Silva', 'Ana Costa', 'Carlos Santos', 'Maria Oliveira', 'João Pedro',
                   'Fernanda Alves', 'Ricardo Gomes', 'Patricia Lima', 'Bruno Martins', 'Juliana Rocha',
                   'Lucas Ferreira', 'Camila Souza', 'Gabriel Ribeiro', 'Beatriz Nunes', 'Felipe Augusto'];

    return names.map((name, i) => ({
      id: i + 1,
      username: name,
      vehicleCount: Math.floor(Math.random() * 15) + 1,
      registeredAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
    }));
  }

  private getMockVehicleStats(): VehicleStatsData {
    const brands = ['Ferrari', 'Porsche', 'Lamborghini', 'Bugatti', 'BMW', 'Mercedes', 'Audi', 'Tesla'];
    const colors = ['Vermelho', 'Preto', 'Branco', 'Azul', 'Prata', 'Amarelo', 'Verde', 'Cinza'];

    const topBrands = brands.slice(0, 5).map((b, i) => ({
      brand: b,
      count: Math.floor(Math.random() * 20) + 5
    })).sort((a, b) => b.count - a.count);

    const topColors = colors.slice(0, 5).map((c, i) => ({
      brand: c,
      count: Math.floor(Math.random() * 25) + 8
    })).sort((a, b) => b.count - a.count);

    const baseDate = new Date();
    const newestVehicles = [
      {
        id: 1,
        name: 'Ferrari F40',
        brand: 'Ferrari',
        color: 'Vermelho',
        registeredAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        owner: 'Paulo Silva'
      },
      {
        id: 2,
        name: 'Porsche 911',
        brand: 'Porsche',
        color: 'Preto',
        registeredAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        owner: 'Ana Costa'
      },
      {
        id: 3,
        name: 'Lamborghini Countach',
        brand: 'Lamborghini',
        color: 'Amarelo',
        registeredAt: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        owner: 'Carlos Santos'
      }
    ];

    const oldestVehicles = [
      {
        id: 84,
        name: 'Jaguar E-Type',
        brand: 'Jaguar',
        color: 'Azul',
        registeredAt: new Date(2024, 0, 15).toISOString(),
        owner: 'Maria Oliveira'
      },
      {
        id: 85,
        name: 'Aston Martin DB5',
        brand: 'Aston Martin',
        color: 'Prata',
        registeredAt: new Date(2024, 0, 20).toISOString(),
        owner: 'João Pedro'
      },
      {
        id: 86,
        name: 'Mercedes 300 SL',
        brand: 'Mercedes',
        color: 'Branco',
        registeredAt: new Date(2024, 1, 5).toISOString(),
        owner: 'Fernanda Alves'
      }
    ];

    return {
      topBrands,
      topColors,
      newestVehicles,
      oldestVehicles
    };
  }
}
