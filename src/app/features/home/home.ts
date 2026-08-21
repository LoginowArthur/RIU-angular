import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../heroes/models/hero.model'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroesListItem } from './components/heroes-list-item/heroes-list-item'
import { Heroes } from '../heroes/services/heroes'

@Component({
  selector: 'app-home',
  imports: [HeroesListItem, AsyncPipe, MatFormFieldModule, MatInputModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  heroesService = inject(Heroes);
  heroes = this.heroesService.heroes;

  ngOnInit() {
    this.heroesService.loadHeroes();
  }

  onEdit(id: string) {
    console.log('on edit', id);
  }

  onDelete(id: string) {
    console.log('on delete', id);
  }
}
