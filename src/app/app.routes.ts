import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { HeroForm } from './features/heroes/components/hero-form/hero-form';
import { HeroFormDialogContainer } from './features/heroes/containers/hero-form-dialog-container/hero-form-dialog-container'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'heroes/add', component: HeroFormDialogContainer },
  { path: 'heroes/edit/:id', component: HeroFormDialogContainer },
  { path: '**', redirectTo: 'home' }
];
