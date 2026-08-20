import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../heroes/models/hero.model'

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private http = inject(HttpClient);
  heroes = this.http.get<Hero[]>('mocks/heroes.json');
}
