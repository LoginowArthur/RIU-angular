import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { HeroForm } from './hero-form';
import { Heroes } from '../../services/heroes';
import { Spinner } from '../../services/spinner';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;
  let mockHeroesService: { addHero: ReturnType<typeof vi.fn>; editHero: ReturnType<typeof vi.fn> };
  let mockSpinnerService: { isLoading: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn>; url: string };
  let queryParams$: BehaviorSubject<Record<string, string>>;

  beforeEach(async () => {
    queryParams$ = new BehaviorSubject<Record<string, string>>({});

    mockHeroesService = {
      addHero: vi.fn().mockReturnValue(of({})),
      editHero: vi.fn().mockReturnValue(of({})),
    };

    mockSpinnerService = {
      isLoading: vi.fn().mockReturnValue(false),
    };

    mockRouter = {
      navigate: vi.fn(),
      url: '/heroes/add',
    };

    await TestBed.configureTestingModule({
      imports: [HeroForm],
      providers: [
        { provide: Heroes, useValue: mockHeroesService },
        { provide: Spinner, useValue: mockSpinnerService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParams$.asObservable(),
          },
        },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create component', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  describe('Form Initialization & Query Parameters', () => {
    it('should initialize form with default values when query params are empty', () => {
      createComponent();

      expect(component.heroForm.getRawValue()).toEqual({
        name: '',
        location: '',
        power: 0,
        status: 'available',
        motto: '',
      });
    });

    it('should patch form values from query parameters on initialization', () => {
      queryParams$.next({
        name: 'Spider-Man',
        location: 'Queens',
        power: '85',
        status: 'available',
        motto: 'With great power comes great responsibility',
      });

      createComponent();

      expect(component.heroForm.getRawValue()).toEqual({
        name: 'Spider-Man',
        location: 'Queens',
        power: 85,
        status: 'available',
        motto: 'With great power comes great responsibility',
      });
    });

    it('should fallback status to "available" if query param status is invalid', () => {
      queryParams$.next({
        status: 'unknown_status',
      });

      createComponent();

      expect(component.heroForm.controls.status.value).toBe('available');
    });

    it('should set power to 0 if query param power is not provided', () => {
      queryParams$.next({
        name: 'Batman',
      });

      createComponent();

      expect(component.heroForm.controls.power.value).toBe(0);
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should mark form as invalid when empty required fields exist', () => {
      expect(component.heroForm.invalid).toBe(true);
    });

    it('should invalidate power control if less than 0 or greater than 100', () => {
      const powerControl = component.heroForm.controls.power;

      powerControl.setValue(-1);
      expect(powerControl.invalid).toBe(true);

      powerControl.setValue(101);
      expect(powerControl.invalid).toBe(true);

      powerControl.setValue(50);
      expect(powerControl.valid).toBe(true);
    });

    it('should mark form as valid when all controls meet criteria', () => {
      component.heroForm.setValue({
        name: 'Iron Man',
        location: 'Malibu',
        power: 95,
        status: 'available',
        motto: 'I am Iron Man',
      });

      expect(component.heroForm.valid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should not call hero service if form is invalid on submit', () => {
      component.onSubmit();

      expect(mockHeroesService.addHero).not.toHaveBeenCalled();
      expect(mockHeroesService.editHero).not.toHaveBeenCalled();
    });

    it('should call addHero when form is valid and route does not contain edit path', () => {
      mockRouter.url = '/heroes/add';

      const validHero = {
        name: 'Thor',
        location: 'Asgard',
        power: 99,
        status: 'available' as const,
        motto: 'For Asgard!',
      };

      component.heroForm.setValue(validHero);
      component.onSubmit();

      expect(mockHeroesService.addHero).toHaveBeenCalledWith(validHero);
      expect(mockHeroesService.editHero).not.toHaveBeenCalled();
    });

    it('should call editHero with extracted ID when form is valid and route contains edit path', () => {
      mockRouter.url = '/heroes/edit/hero-123?status=available';

      const validHero = {
        name: 'Thor',
        location: 'Asgard',
        power: 99,
        status: 'available' as const,
        motto: 'For Asgard!',
      };

      component.heroForm.setValue(validHero);
      component.onSubmit();

      expect(mockHeroesService.editHero).toHaveBeenCalledWith('hero-123', validHero);
      expect(mockHeroesService.addHero).not.toHaveBeenCalled();
    });
  });
});