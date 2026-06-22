import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  // ─── Public auth ──────────────────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },

  // ─── Public storefront ────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./nav/nav').then(m => m.Nav),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.Home)
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about').then(m => m.About)
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact').then(m => m.Contact)
      }
    ]
  },

  // ─── Admin / Dashboard (protected) ────────────────────────────────────────
  {
    path: 'admin',
    loadComponent: () => import('./Dashboard/nav/nav').then(m => m.Nav),
    canActivate: [authGuard],
    children: [
      // Dashboard home — all roles
      {
        path: '',
        loadComponent: () => import('./Dashboard/main/main').then(m => m.Main)
      },

      {
        path: 'products',
        loadComponent: () =>
          import('./Dashboard/products/products').then(m => m.Products),

      },
      {
        path: 'updatehome',
        loadComponent: () => import('./Dashboard/update-home/update-home').then((x) => x.UpdateHome)
      }

    ]
  },

  // ─── 404 catch-all ────────────────────────────────────────────────────────
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound)
  }
];
