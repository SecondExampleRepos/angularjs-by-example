// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeController } from '../components/home/home.component';
import { PremieresController } from '../components/premieres/premieres.component';
import { SearchController } from '../components/search/search.component';
import { PopularController } from '../components/popular/popular.component';
import { ViewController } from '../components/view/view.component';
import { ShowService } from '../services/ShowService.service';

const routes: Routes = [
  {
    path: '',
    component: HomeController
  },
  {
    path: 'premieres',
    component: PremieresController,
    resolve: {
      shows: ShowService.prototype.getPremieres
    }
  },
  {
    path: 'search',
    component: SearchController
  },
  {
    path: 'search/:query',
    component: SearchController
  },
  {
    path: 'popular',
    component: PopularController,
    resolve: {
      shows: ShowService.prototype.getPopular
    }
  },
  {
    path: 'view/:id',
    component: ViewController,
    resolve: {
      show: (route: any) => ShowService.prototype.get(route.params.id)
    }
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
