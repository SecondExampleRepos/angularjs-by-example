// Converted from src/components/show/show.drct.js

import { Directive, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService.service';

@Directive({
  selector: 'app-show'
})
export class ShowDirective implements OnInit {
  @Input() show: any;
  genres: string[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    if (this.show && this.show.id) {
      this.showService.get(this.show.id).subscribe(response => {
        this.genres = response.genres;
      });
    }
  }
}
