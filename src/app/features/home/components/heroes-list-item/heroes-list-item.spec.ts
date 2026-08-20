import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListItem } from './heroes-list-item';

describe('HeroesListItem', () => {
  let component: HeroesListItem;
  let fixture: ComponentFixture<HeroesListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
