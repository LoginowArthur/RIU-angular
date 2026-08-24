import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, of } from 'rxjs';
import { HeroFormDialogContainer } from './hero-form-dialog-container';

describe('HeroFormDialogContainer', () => {
  let component: HeroFormDialogContainer;
  let fixture: ComponentFixture<HeroFormDialogContainer>;
  let mockDialogRef: { close: ReturnType<typeof vi.fn>; afterClosed: ReturnType<typeof vi.fn> };
  let mockDialog: { open: ReturnType<typeof vi.fn> };
  let mockRouter: { navigate: ReturnType<typeof vi.fn>; events: Subject<unknown>; url: string };
  let routerEvents$: Subject<unknown>;
  let afterClosed$: Subject<void>;

  beforeEach(async () => {
    routerEvents$ = new Subject<unknown>();
    afterClosed$ = new Subject<void>();

    mockDialogRef = {
      close: vi.fn(),
      afterClosed: vi.fn().mockReturnValue(afterClosed$.asObservable()),
    };

    mockDialog = {
      open: vi.fn().mockReturnValue(mockDialogRef),
    };

    mockRouter = {
      navigate: vi.fn(),
      events: routerEvents$,
      url: '/heroes/add',
    };

    await TestBed.configureTestingModule({
      imports: [HeroFormDialogContainer],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(HeroFormDialogContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create and open MatDialog on initialization', () => {
    createComponent();
    expect(component).toBeTruthy();
    expect(mockDialog.open).toHaveBeenCalledTimes(1);
  });

  it('should close dialog when NavigationEnd triggers on non-add route', () => {
    createComponent();

    routerEvents$.next(new NavigationEnd(1, '/other', '/other'));

    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should not close dialog when NavigationEnd triggers on add route', () => {
    createComponent();

    routerEvents$.next(new NavigationEnd(1, '/heroes/add', '/heroes/add'));

    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should navigate to home after dialog closes if on heroes/add route', () => {
    mockRouter.url = '/heroes/add';
    createComponent();

    afterClosed$.next();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to home after dialog closes if on heroes/edit route', () => {
    mockRouter.url = '/heroes/edit/123';
    createComponent();

    afterClosed$.next();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate to home after dialog closes if on unrelated route', () => {
    mockRouter.url = '/dashboard';
    createComponent();

    afterClosed$.next();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});