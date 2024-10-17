// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeControllerComponent } from '../components/HomeController/HomeController.component';
import { PremieresComponent } from '../components/PremieresController/PremieresController.component';
import { SearchComponent } from '../components/SearchController/SearchController.component';
import { PopularComponent } from '../components/PopularController/PopularController.component';
import { ViewControllerComponent } from '../components/ViewController/ViewController.component';
import { ShowService } from '../services/show.service';

const routes: Routes = [
  {
    path: '',
    component: HomeControllerComponent
  },
  {
    path: 'premieres',
    component: PremieresComponent,
    resolve: {
      shows: ShowService
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
      shows: ShowService
    }
  },
  {
    path: 'view/:id',
    component: ViewControllerComponent,
    resolve: {
      show: ShowService
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
