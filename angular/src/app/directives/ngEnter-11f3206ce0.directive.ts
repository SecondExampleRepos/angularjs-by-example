// Converted from src/directives/ngEnter.drct.js

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngEnter]'
})
export class NgEnterDirective {
  @Input() ngEnter: () => void;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  @HostListener('keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.which === 13) {
      if (this.ngEnter) {
        this.ngEnter();
      }
      event.preventDefault();
    }
  }
}
