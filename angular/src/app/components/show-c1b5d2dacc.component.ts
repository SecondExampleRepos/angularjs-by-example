// Converted from src/components/show/show.drct.js

import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService-60e6084c07.service';

@Component({
  selector: 'app-show',
  templateUrl: './show-c1b5d2dacc.component.html',
  styleUrls: ['./show-c1b5d2dacc.component.css']
})
export class ShowComponent implements OnInit {
  @Input() show!: any;
  genres: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  private loadGenres(): void {
    this.showService.get(this.show.id).subscribe(response => {
      this.genres = response.genres;
    });
  }
}
