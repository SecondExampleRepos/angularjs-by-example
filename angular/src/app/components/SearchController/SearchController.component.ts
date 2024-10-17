// Converted from src/sections/search/search.ctrl.js

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { PageValuesService } from '../../services/page-values.service';

@Component({
  selector: 'app-search-controller',
  templateUrl: './SearchController.component.html',
  styleUrls: ['./SearchController.component.css']
})
export class SearchControllerComponent implements OnInit {
  query: string | null = null;
  shows: any[] = [];
  loading: boolean | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showService: ShowService,
    private pageValues: PageValuesService
  ) {}

  ngOnInit(): void {
    this.pageValues.title = "SEARCH";
    this.pageValues.description = "Search for your favorite TV shows.";

    this.route.paramMap.subscribe(params => {
      const queryParam = params.get('query');
      if (queryParam) {
        this.performSearch(queryParam);
        this.query = decodeURI(queryParam);
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
