// Converted from src/components/show/show.drct.js

import { Directive, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/show.service';

@Directive({
  selector: 'app-show',
  templateUrl: './show.tpl-3e2ab2bde3.html'
})
export class ShowDirective implements OnInit {
  @Input() show: any;
  genres: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.get(this.show.id).subscribe(response => {
      this.genres = response.genres;
    });
  }
}
