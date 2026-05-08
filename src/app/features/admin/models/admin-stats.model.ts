export interface AdminStats {
  userCount: number;
  vehicleCount: number;
}

export interface UserWithVehicles {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  vehicleCount: number;
  registeredAt?: string;
}

export interface VehicleFrequency {
  brand: string;
  count: number;
}

export interface VehicleStatsData {
  topBrands: VehicleFrequency[];
  topColors: VehicleFrequency[];
  newestVehicles: VehicleWithOwner[];
  oldestVehicles: VehicleWithOwner[];
}

export interface VehicleWithOwner {
  id: number;
  name: string;
  brand: string;
  color: string;
  registeredAt: string;
  owner: string;
}

export interface AdminDashboardData {
  stats: AdminStats;
  users: UserWithVehicles[];
  vehicleStats: VehicleStatsData;
}
