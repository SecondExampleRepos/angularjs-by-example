// Converted from src/directives/ngEnter.drct.js

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngEnter]'
})
export class NgEnterDirective {
  @Input() ngEnter: () => void;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.ngEnter) {
        this.ngEnter();
      }
      event.preventDefault();
    }
  }
}
