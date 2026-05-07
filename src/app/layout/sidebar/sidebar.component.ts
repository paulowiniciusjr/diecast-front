import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <!-- ── Main Menu ── -->
        <div class="nav-section">
          <a
            routerLink="/vehicles"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.9-1.7-1.7-1.7h-.5c-.4 0-.8-.1-1.2-.3l-1.2-1c-.4-.3-1-.3-1.4 0l-1.2 1c-.4.2-.8.3-1.2.3h-.5C9.9 10.3 9 11.1 9 12v3c0 .6.4 1 1 1h2"/>
              <circle cx="12" cy="13" r="2"/>
              <path d="M17 9h-5V7c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v2z"/>
            </svg>
            Minha Coleção
          </a>

          <a
            *ngIf="authService.isAdmin()"
            routerLink="/admin"
            routerLinkActive="active"
            class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3v6m0 6v6M3 12h6m6 0h6"/>
              <rect x="4" y="4" width="16" height="16" rx="2"/>
            </svg>
            Dashboard Admin
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      padding: 24px 0;
      height: calc(100vh - 68px);
      overflow-y: auto;
      position: sticky;
      top: 68px;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 12px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: var(--color-text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: var(--radius-sm);
      transition: all var(--transition);
      cursor: pointer;
    }

    .nav-item svg {
      flex-shrink: 0;
      transition: transform var(--transition);
    }

    .nav-item:hover {
      background: rgba(201,168,76,0.08);
      color: var(--color-gold);
    }

    .nav-item:hover svg {
      transform: scale(1.1);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.08) 100%);
      color: var(--color-gold);
      border-left: 3px solid var(--color-gold);
      padding-left: 13px;
    }

    .nav-item.active svg {
      color: var(--color-gold);
    }

    .sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar::-webkit-scrollbar-track {
      background: transparent;
    }

    .sidebar::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 3px;
    }

    .sidebar::-webkit-scrollbar-thumb:hover {
      background: var(--color-border-glow);
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
    }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}

