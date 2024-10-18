// Converted from src/sections/view/view.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { PageValues } from '../../constants/page-values';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view.tpl-645a2231ed.html',
  styleUrls: ['./view.css']
})
export class ViewControllerComponent implements OnInit {
  @Input() show!: any;

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('id');
    if (showId) {
      this.showService.get(showId).then(show => {
        this.show = show;
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;
        this.loadCast(show.id);
      });
    }
  }

  setBannerImage() {
    return {
      'background': 'url() no-repeat',
      'background-size': '100%',
      'background-position': '100% 0%'
    };
  }

  private loadCast(showId: string): void {
    this.showService.getCast(showId).then(response => {
      this.show.cast = response.cast;
    });
  }
}
