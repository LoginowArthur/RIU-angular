import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormDialogContainer } from './hero-form-dialog-container';

describe('HeroFormDialogContainer', () => {
  let component: HeroFormDialogContainer;
  let fixture: ComponentFixture<HeroFormDialogContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormDialogContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormDialogContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
