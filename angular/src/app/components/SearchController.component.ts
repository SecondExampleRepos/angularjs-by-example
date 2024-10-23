// Converted from src/sections/search/search.ctrl.js

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../services/ShowService.service';
import { PageValues } from '../constants/PageValues';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search.tpl.html',
  styleUrls: ['./search.css']
})
export class SearchControllerComponent implements OnInit {
  query: string | null = null;
  shows: any[] = [];
  loading: boolean | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showService: ShowService,
    private pageValues: PageValues
  ) {}

  ngOnInit(): void {
    this.pageValues.title = "SEARCH";
    this.pageValues.description = "Search for your favorite TV shows.";

    this.route.params.subscribe(params => {
      if (params['query']) {
        this.performSearch(params['query']);
        this.query = decodeURI(params['query']);
      }
    });
  }

  setSearch(): void {
    if (this.query) {
      const query = encodeURI(this.query);
      this.router.navigate(['/search', query]);
    }
  }

  performSearch(query: string): void {
    this.loading = true;
    this.showService.search(query).then(response => {
      this.shows = response;
      this.loading = false;
    });
  }
}
