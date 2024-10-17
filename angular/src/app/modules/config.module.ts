// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/HomeController/HomeController.component';
import { PremieresComponent } from '../components/PremieresController/PremieresController.component';
import { SearchComponent } from '../components/SearchController/SearchController.component';
import { PopularComponent } from '../components/PopularController/PopularController.component';
import { ViewControllerComponent } from '../components/ViewController/ViewController.component';
import { ShowService } from '../services/show.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'premieres',
    component: PremieresComponent,
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
    component: ViewControllerComponent,
    resolve: {
      show: (route: ActivatedRoute) => ShowService.get(route.snapshot.paramMap.get('id'))
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ShowService]
})
export class ConfigModule {}
