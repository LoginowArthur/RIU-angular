import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {HeroForm} from './components/hero-form/hero-form'

export type Hero = { 
  id: string,
  name: string,
  location: string,
  power: number,
  status: 'available' | 'missing' | 'dead',
  motto: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, HeroForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private http = inject(HttpClient);
  heroes = this.http.get<Hero[]>('mocks/heroes.json');
}
