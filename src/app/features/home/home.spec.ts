import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from './home';
import { Heroes } from '../heroes/services/heroes';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  
  let lastRemovedId: string | null = null;
  let lastNavigatedPath: unknown[] | null = null;
  let lastNavigatedExtras: unknown = null;

  const mockHeroes = [
    { id: '1', name: 'Superman', power: 'Flight' },
    { id: '2', name: 'Batman', power: 'Martial Arts' }
  ];
  const heroesSignal = signal(mockHeroes);

  beforeEach(async () => {
    lastRemovedId = null;
    lastNavigatedPath = null;
    lastNavigatedExtras = null;

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: Heroes,
          useValue: {
            heroes: heroesSignal,
            removeHero: (id: string) => { lastRemovedId = id; }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: (commands: unknown[], extras?: unknown) => {
              lastNavigatedPath = commands;
              lastNavigatedExtras = extras;
              return Promise.resolve(true);
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit route with hero query params', () => {
    component.onEdit('1');
    expect(lastNavigatedPath).toEqual(['/heroes/edit', '1']);
    expect(lastNavigatedExtras).toEqual({ queryParams: { name: 'Superman', power: 'Flight' } });
  });

  it('should remove hero via service on delete', () => {
    component.onDelete('1');
    expect(lastRemovedId).toBe('1');
  });
});