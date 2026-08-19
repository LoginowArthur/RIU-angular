import { Routes } from '@angular/router';
// import { HomeComponent } from ''
import { App } from './app';
import { HeroForm } from './components/hero-form/hero-form';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: App },
  { path: 'heroes/add', component: HeroForm },
  { path: 'heroes/edit/:id', component: HeroForm },
  { path: '**', redirectTo: 'home' }
];
