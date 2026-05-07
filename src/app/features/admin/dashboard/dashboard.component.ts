import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminDashboardData } from '../models/admin-stats.model';
import { ColorConverter } from '../../../shared/color.converter';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  data!: AdminDashboardData;
  loading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(resolved => {
      this.data = resolved['data'];
      this.loading = false;
    });
  }

  getColorValue(colorInput: string): string {
    return ColorConverter.parse(colorInput);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
