'use strict';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from './show.service';
import { PageValues } from './page-values.model';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchController {
    query: string | null = null;
    shows: any[] = [];
    loading: boolean | null = null;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private showService: ShowService,
        private pageValues: PageValues
    ) {
        this.pageValues.title = "SEARCH";
        this.pageValues.description = "Search for your favorite TV shows.";
        this.route.params.subscribe(params => {
            if (params['query']) {
                this.performSearch(params['query']);
                this.query = decodeURIComponent(params['query']);
            }
        });
    }
    setSearch(): void {
        const encodedQuery = encodeURIComponent(this.query || '');
        this.router.navigate(['/search', encodedQuery]);
    }
    performSearch(query: string): void {
        this.loading = true;
        this.showService.search(query).then(response => {
            this.shows = response;
            this.loading = false;
        });
    }
}