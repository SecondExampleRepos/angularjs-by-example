// Converted from src/components/show/show.drct.js

import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.tpl-3e2ab2bde3.html',
  styleUrls: ['./show.css']
})
export class ShowComponent implements OnInit {
  @Input() show!: any;
  genres: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  private loadGenres(): void {
    this.showService.get(this.show.id).then(response => {
      this.genres = response.genres;
    });
  }
}
