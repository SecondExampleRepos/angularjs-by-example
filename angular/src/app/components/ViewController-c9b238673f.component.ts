// Converted from src/sections/view/view.ctrl.js

import { Component, OnInit, Input } from '@angular/core';
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
    private route: ActivatedRoute,
    private pageValues: PageValues
  ) {}

  ngOnInit(): void {
    this.pageValues.title = "VIEW";
    this.pageValues.description = `Overview, seasons & info for '${this.show.original_name}'.`;

    this.route.params.subscribe(params => {
      const showId = params['id'];
      this.showService.getCast(showId).then(response => {
        this.show.cast = response.cast;
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
}
