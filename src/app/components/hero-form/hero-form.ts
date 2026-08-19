import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  heroForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    power: new FormControl(0),
    status: new FormControl('available'),
    motto: new FormControl('')
  });
}
