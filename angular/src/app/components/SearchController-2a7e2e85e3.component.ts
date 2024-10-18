// Converted from src/sections/search/search.ctrl.js

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../services/show.service';
import { PageValues } from '../services/page-values.service';

@Component({
  selector: 'app-search-controller',
  templateUrl: './SearchController-2a7e2e85e3.component.html',
  styleUrls: ['./SearchController-2a7e2e85e3.component.css']
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
    // Set page title and description
    this.pageValues.title = "SEARCH";
    this.pageValues.description = "Search for your favorite TV shows.";

    // Check if query parameter exists and perform search
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
