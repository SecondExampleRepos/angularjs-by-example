// Converted from src/sections/view/view.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../services/ShowService.service';
import { PageValues } from '../constants/PageValues';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewControllerComponent implements OnInit {
  @Input() show!: any;
  cast: any[] = [];

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private pageValues: PageValues
  ) {}

  ngOnInit(): void {
    this.pageValues.title = "VIEW";
    this.pageValues.description = `Overview, seasons & info for '${this.show.original_name}'.`;

    this.route.params.subscribe(params => {
      const showId = params['id'];
      this.showService.get(showId).subscribe(show => {
        this.show = show;
        this.loadCast(showId);
      });
    });
  }

  setBannerImage() {
    return {
      'background': 'url() no-repeat',
      'background-size': '100%',
      'background-position': '100% 0%'
    };
  }

  private loadCast(showId: string): void {
    this.showService.getCast(showId).subscribe(response => {
      this.cast = response.cast;
    });
  }
}
