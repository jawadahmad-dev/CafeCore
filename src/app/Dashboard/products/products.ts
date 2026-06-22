import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <div class="page-header">
      <h2 class="page-title">Products</h2>
      <p class="page-subtitle">Manage your product catalogue</p>
    </div>
    <div class="coming-soon-card glass">
      <div class="coming-soon-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </div>
      <h3>Products — Coming Next</h3>
      <p>Full product management with search, filter, and stock tracking.</p>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 32px; }
    .page-title { font-family: var(--font-serif); font-size: 28px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px; }
    .page-subtitle { font-size: 14px; color: var(--text-secondary); }
    .coming-soon-card { padding: 60px 40px; text-align: center; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.5); }
    .coming-soon-icon { color: var(--accent-terracotta); margin-bottom: 20px; }
    h3 { font-family: var(--font-serif); font-size: 22px; margin-bottom: 10px; color: var(--text-primary); }
    p { color: var(--text-secondary); font-size: 15px; }
  `]
})
export class Products {}
