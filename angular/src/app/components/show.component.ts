// Converted from src/components/show/show.drct.js

import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.tpl.html',
  styleUrls: ['./show.css']
})
export default class ShowComponent implements OnInit {
  @Input() show!: any;
  genres: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.get(this.show.id).then(response => {
      this.genres = response.genres;
    });
  }
}
