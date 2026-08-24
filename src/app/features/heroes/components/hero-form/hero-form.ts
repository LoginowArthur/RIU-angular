import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Heroes } from '../../services/heroes';
import { Spinner } from '../../services/spinner';
import { HeroFormVal } from '../../models/hero.model';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const statusValue = params['status'];
        const validStatuses: Array<HeroFormControls['status']['value']> = ['available', 'missing', 'dead'];

        this.heroForm.patchValue({
          name: params['name'] ?? '',
          location: params['location'] ?? '',
          power: params['power'] ? Number(params['power']) : 0,
          status: validStatuses.includes(statusValue) ? statusValue : 'available',
          motto: params['motto'] ?? ''
        });
      });
  }

  onSubmit(): void {
    const segments = this.router.url;
    const pathSegments = segments.split('?')[0].split('/');
    const editIndex = pathSegments.indexOf('edit');
    const heroId = editIndex !== -1 ? pathSegments[editIndex + 1] ?? null : null;
    const formVal: HeroFormVal = this.heroForm.getRawValue();

    if (this.heroForm.invalid) {
      return;
    }

    const request$ = heroId
      ? this.heroes.editHero(heroId, formVal)
      : this.heroes.addHero(formVal);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
