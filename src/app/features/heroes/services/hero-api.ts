import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroFormVal } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroApi {
  private readonly http = inject(HttpClient);

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('mocks/heroes.json');
  }

  addHero(heroFormVal: HeroFormVal): Observable<Hero> {
    return this.http.post<Hero>('mocks/heroes.json', heroFormVal)
  }
}