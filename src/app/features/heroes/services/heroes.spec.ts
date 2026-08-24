import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { Heroes } from './heroes';
import { HeroApi } from './hero-api';
import { Hero, HeroFormVal } from '../models/hero.model';

describe('Heroes', () => {
  let service: Heroes;
  let heroApiMock: { 
    getAllHeroes: ReturnType<typeof vi.fn>; 
    addHero: ReturnType<typeof vi.fn>; 
    editHero: ReturnType<typeof vi.fn>; 
  };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  const mockHero: Hero = { id: '1', name: 'Spider-Man' } as Hero;
  const mockHeroFormVal: HeroFormVal = { name: 'Spider-Man' } as HeroFormVal;

  beforeEach(() => {
    heroApiMock = {
      getAllHeroes: vi.fn(),
      addHero: vi.fn(),
      editHero: vi.fn(),
    };
    routerMock = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        Heroes,
        { provide: HeroApi, useValue: heroApiMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    service = TestBed.inject(Heroes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadHeroes', () => {
    it('should fetch heroes and update signal state', () => {
      heroApiMock.getAllHeroes.mockReturnValue(of([mockHero]));

      service.loadHeroes();

      expect(heroApiMock.getAllHeroes).toHaveBeenCalledTimes(1);
      expect(service.heroes()).toEqual([mockHero]);
    });

    it('should skip API call when signal state is already populated', () => {
      heroApiMock.getAllHeroes.mockReturnValue(of([mockHero]));

      service.loadHeroes();
      service.loadHeroes();

      expect(heroApiMock.getAllHeroes).toHaveBeenCalledTimes(1);
    });
  });

  describe('addHero', () => {
    it('should invoke API, update signal state, and navigate home on success', () => {
      heroApiMock.addHero.mockReturnValue(of(mockHero));

      service.addHero(mockHeroFormVal).subscribe();

      expect(heroApiMock.addHero).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Spider-Man', id: expect.any(String) })
      );
      expect(service.heroes()).toHaveLength(1);
      expect(service.heroes()[0].name).toBe('Spider-Man');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should propagate error on API failure', () => {
      const apiError = new Error('Database Error');
      heroApiMock.addHero.mockReturnValue(throwError(() => apiError));

      let caughtError: unknown;
      service.addHero(mockHeroFormVal).subscribe({
        error: (err) => (caughtError = err),
      });

      expect(caughtError).toBe(apiError);
      expect(service.heroes()).toEqual([]);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('editHero', () => {
    it('should update specific hero in signal state and navigate home on success', () => {
      const updatedFormVal: HeroFormVal = { name: 'Peter Parker' } as HeroFormVal;
      const expectedUpdatedHero: Hero = { id: '1', name: 'Peter Parker' } as Hero;

      // Seed initial state
      heroApiMock.getAllHeroes.mockReturnValue(of([mockHero]));
      service.loadHeroes();

      heroApiMock.editHero.mockReturnValue(of(expectedUpdatedHero));

      service.editHero('1', updatedFormVal).subscribe();

      expect(heroApiMock.editHero).toHaveBeenCalledWith('1', expectedUpdatedHero);
      expect(service.heroes()).toEqual([expectedUpdatedHero]);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should propagate error on API failure', () => {
      const apiError = new Error('Update Failed');
      heroApiMock.editHero.mockReturnValue(throwError(() => apiError));

      let caughtError: unknown;
      service.editHero('1', mockHeroFormVal).subscribe({
        error: (err) => (caughtError = err),
      });

      expect(caughtError).toBe(apiError);
    });
  });

  describe('removeHero', () => {
    it('should remove hero from signal state by ID', () => {
      heroApiMock.getAllHeroes.mockReturnValue(of([mockHero]));
      service.loadHeroes();

      service.removeHero('1');

      expect(service.heroes()).toEqual([]);
    });
  });
});