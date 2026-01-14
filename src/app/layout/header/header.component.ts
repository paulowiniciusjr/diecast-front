import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/storage/storage.service';


@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <h1>Diecast</h1>

      <button (click)="logout()">Logout</button>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #222;
      color: #fff;
      padding: 12px 16px;
    }

    button {
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  logout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
