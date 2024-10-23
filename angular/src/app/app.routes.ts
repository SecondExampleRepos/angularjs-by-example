// Converted from angular/src/app/modules/config.routing.module.ts

import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PremieresControllerComponent } from '../components/premieres-controller.component';
import { SearchComponent } from '../components/search/search.component';
import { PopularComponent } from '../components/popular/popular.component';
import { ViewComponent } from '../components/view/view.component';
import { ShowService } from '../services/show.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'premieres',
    component: PremieresControllerComponent,
    resolve: {
      shows: () => ShowService.getPremieres()
    }
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'popular',
    component: PopularComponent,
    resolve: {
      shows: () => ShowService.getPopular()
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      show: (route) => ShowService.get(route.params.id)
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
