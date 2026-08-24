import { Component, inject, DestroyRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Heroes } from '../../services/heroes';
import { Spinner } from '../../services/spinner';
import { HeroFormVal } from '../../models/hero.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type HeroFormControls = {
  name: FormControl<string>;
  location: FormControl<string>;
  power: FormControl<number>;
  status: FormControl<'available' | 'missing' | 'dead'>;
  motto: FormControl<string>;
};

@Component({
  selector: 'app-hero-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  readonly spinner = inject(Spinner);
  private readonly heroes = inject(Heroes);
  private readonly destroyRef = inject(DestroyRef);

  heroForm = new FormGroup<HeroFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators:  [Validators.required]
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators:  [Validators.required]
    }),
    power: new FormControl(0, {
      nonNullable: true,
      validators:  [
        Validators.required, 
        Validators.min(0),
        Validators.max(100)
      ]
    }),
    status: new FormControl('available', {
      nonNullable: true,
    }),
    motto: new FormControl('', {
      nonNullable: true,
      validators:  [Validators.required]
    })
  });

  onSubmit(): void {
    if (this.heroForm.valid) {
      const formVal: HeroFormVal = this.heroForm.getRawValue();
      this.heroes.addHero(formVal)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    }
  }
}
