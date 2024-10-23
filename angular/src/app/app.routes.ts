// Converted from angular/src/app/modules/config.routing.module.ts

import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home.component';
import { PremieresControllerComponent } from '../components/premieres-controller.component';
import { SearchComponent } from '../components/search.component';
import { PopularComponent } from '../components/popular.component';
import { ViewComponent } from '../components/view.component';
import { ShowService } from '../services/show.service';
import { ActivatedRouteSnapshot } from '@angular/router';

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
      show: (route: ActivatedRouteSnapshot) => ShowService.get(route.params['id'])
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
