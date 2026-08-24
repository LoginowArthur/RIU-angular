import { Directive } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  host: {
    style: 'text-transform: uppercase;'
  }
})
export class Uppercase {}