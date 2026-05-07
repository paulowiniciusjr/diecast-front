import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../core/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-brand">
        <span class="brand-icon">🏎</span>
        <div class="brand-text">
          <span class="brand-name">DIECAST</span>
          <span class="brand-sub">COLLECTION</span>
        </div>
      </div>

      <nav class="header-nav">
        <button class="logout-btn" (click)="logout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sair
        </button>
      </nav>
    </header>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

    :host {
      display: block;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #16181c;
      border-bottom: 1px solid #2a2d35;
      padding: 0 32px;
      height: 68px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);

      /* Linha dourada sutil no topo */
      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent 100%);
      }
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .brand-icon {
      font-size: 1.8rem;
      filter: drop-shadow(0 0 8px rgba(201,168,76,0.4));
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .brand-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.8rem;
      letter-spacing: 0.08em;
      background: linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .brand-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      color: #4a4f60;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      background: transparent;
      color: #7c8196;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      border: 1px solid #2a2d35;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.25s ease;

      svg {
        transition: transform 0.25s ease;
      }

      &:hover {
        color: #e74c3c;
        border-color: rgba(231,76,60,0.35);
        background: rgba(231,76,60,0.08);

        svg {
          transform: translateX(3px);
        }
      }
    }

    @keyframes shimmer {
      from { background-position: 0% center; }
      to   { background-position: 200% center; }
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
