import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from './features/heroes/services/spinner'
import { Heroes } from './features/heroes/services/heroes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  heroesService = inject(Heroes);

  ngOnInit() {
    this.heroesService.loadHeroes();
  }
}
