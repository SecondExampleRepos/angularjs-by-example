import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngEnter]'
})
export class NgEnterDirective {
  @Input() ngEnter: () => void;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.ngEnter();
      event.preventDefault();
    }
  }
}