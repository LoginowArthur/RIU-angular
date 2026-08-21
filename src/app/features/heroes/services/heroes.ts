import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HeroApi } from './hero-api';

@Injectable({
  providedIn: 'root',
})
export class Heroes {
  private readonly heroApi = inject(HeroApi);
  
  private readonly heroesSignal = signal<Hero[]>([]);
  readonly heroes = this.heroesSignal.asReadonly();

  loadHeroes(): void {
    this.heroApi.getAllHeroes().subscribe({
      next: (data) => this.heroesSignal.set(data),
    });
  }

  clearCache(): void {
    this.heroesSignal.set([]);
  }
}