// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PremieresComponent } from './components/premieres.component';
import { SearchComponent } from './components/search.component';
import { PopularComponent } from './components/popular.component';
import { ViewComponent } from './components/view.component';
import { ShowService } from './services/show.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HOME', description: 'Learn AngularJS using best practice real world examples.' }
  },
  {
    path: 'premieres',
    component: PremieresComponent,
    resolve: {
      shows: ShowService.prototype.getPremieres
    },
    data: { title: 'PREMIERES', description: 'The latest TV premieres.' }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'SEARCH', description: 'Search for your favorite TV shows.' }
  },
  {
    path: 'search/:query',
    component: SearchComponent,
    data: { title: 'SEARCH', description: 'Search for your favorite TV shows.' }
  },
  {
    path: 'popular',
    component: PopularComponent,
    resolve: {
      shows: ShowService.prototype.getPopular
    },
    data: { title: 'POPULAR', description: 'The most popular TV shows.' }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      show: ShowService.prototype.get
    },
    data: { title: 'VIEW', description: 'Overview, seasons & info for the selected show.' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
