import { Routes } from '@angular/router';
// import { HomeComponent } from ''
import { App } from './app';
import { HeroForm } from './components/hero-form/hero-form';
import { HeroFormDialogContainer } from './components/hero-form-dialog-container/hero-form-dialog-container'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: App },
  { path: 'heroes/add', component: HeroFormDialogContainer },
  { path: 'heroes/edit/:id', component: HeroFormDialogContainer },
  { path: '**', redirectTo: 'home' }
];
