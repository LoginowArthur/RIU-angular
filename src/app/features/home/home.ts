import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../heroes/models/hero.model'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroesListItem } from './components/heroes-list-item/heroes-list-item'

@Component({
  selector: 'app-home',
  imports: [HeroesListItem, AsyncPipe, MatFormFieldModule, MatInputModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private http = inject(HttpClient);
  heroes = this.http.get<Hero[]>('mocks/heroes.json');
}
