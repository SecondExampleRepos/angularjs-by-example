// Converted from src/sections/view/view.ctrl.js

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { PageValuesService } from '../../services/page-values.service';

@Component({
  selector: 'app-view-controller',
  templateUrl: './view.tpl-645a2231ed.html',
  styleUrls: ['./view.css']
})
export class ViewControllerComponent implements OnInit {
  @Input() show!: any;
  cast: any[] = [];

  constructor(
    private showService: ShowService,
    private pageValuesService: PageValuesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageValuesService.title = "VIEW";
    this.pageValuesService.description = `Overview, seasons & info for '${this.show.original_name}'.`;

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
