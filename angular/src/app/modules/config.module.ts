// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeController } from '../components/HomeController/HomeController.component';
import { PremieresController } from '../components/PremieresController/PremieresController.component';
import { SearchController } from '../components/SearchController/SearchController.component';
import { PopularController } from '../components/PopularController/PopularController.component';
import { ViewController } from '../components/ViewController/ViewController.component';
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
      shows: () => ShowService.getPremieres()
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
      shows: () => ShowService.getPopular()
    }
  },
  {
    path: 'view/:id',
    component: ViewController,
    resolve: {
      show: (route: any) => ShowService.get(route.params.id)
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
export class ConfigModule {}
