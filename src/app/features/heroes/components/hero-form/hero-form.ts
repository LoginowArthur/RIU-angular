import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  heroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    location: new FormControl('', [
      Validators.required,
    ]),
    power: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]),
    status: new FormControl('1'),
    motto: new FormControl('', [
      Validators.required,
    ])
  });

  onSubmit(): void {
    if (this.heroForm.valid) {
      console.log('form is valid');
    }
  }
}
