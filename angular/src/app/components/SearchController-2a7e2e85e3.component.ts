// Converted from src/sections/search/search.ctrl.js

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../services/show.service';
import { PageValuesService } from '../services/page-values.service';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search.tpl-c0e2a18487.html',
  styleUrls: ['./search.component.css']
})
export class SearchControllerComponent implements OnInit {
  query: string | null = null;
  shows: any[] = [];
  loading: boolean | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showService: ShowService,
    private pageValuesService: PageValuesService
  ) {
    // Set page title and description
    this.pageValuesService.title = "SEARCH";
    this.pageValuesService.description = "Search for your favorite TV shows.";
  }

  ngOnInit(): void {
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
    this.showService.search(query).subscribe(response => {
      this.shows = response;
      this.loading = false;
    });
  }
}
