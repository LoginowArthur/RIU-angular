import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HeroesListItem } from './components/heroes-list-item/heroes-list-item';
import { Heroes } from '../heroes/services/heroes';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeroesListItem, 
    AsyncPipe, 
    MatFormFieldModule, 
    MatInputModule, 
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly heroesService = inject(Heroes);
  private readonly router = inject(Router);
  
  readonly heroes = this.heroesService.heroes;
  
  readonly pageSize = signal<number>(10);
  readonly pageIndex = signal<number>(0);
  readonly searchTerm = signal<string>('');

  readonly filteredHeroes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.heroes();

    return this.heroes().filter(hero => 
      hero.name.toLowerCase().includes(term) || 
      hero.id.toLowerCase().includes(term)
    );
  });

  readonly paginatedHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredHeroes().slice(start, end);
  });

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.pageIndex.set(0);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  onAdd(): void {
    this.router.navigate(['/heroes/add']);
  }

  onEdit(heroId: string): void {
    const hero = this.heroes().find(hero => hero.id === heroId);
    const { id: _, ...heroData } = hero!;
    this.router.navigate(['/heroes/edit', heroId], {
      queryParams: heroData
    });
  }

  onDelete(id: string): void {
    this.heroesService.removeHero(id);
  }
}
