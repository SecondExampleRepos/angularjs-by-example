// Converted from src/sections/search/search.ctrl.js

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { PageValues } from '../../constants/page-values';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search.tpl-c0e2a18487.html',
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
    this.showService.search(query).subscribe(response => {
      this.shows = response;
      this.loading = false;
    });
  }
}
