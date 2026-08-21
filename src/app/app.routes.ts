import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  { 
    path: 'heroes/add', 
    loadComponent: () => import('./features/heroes/containers/hero-form-dialog-container/hero-form-dialog-container').then(m => m.HeroFormDialogContainer)
  },
  { 
    path: 'heroes/edit/:id', 
    loadComponent: () => import('./features/heroes/containers/hero-form-dialog-container/hero-form-dialog-container').then(m => m.HeroFormDialogContainer)
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];
