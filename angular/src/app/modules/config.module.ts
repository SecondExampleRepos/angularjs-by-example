// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/HomeController/HomeController.component';
import { PremieresComponent } from '../components/PremieresController/PremieresController.component';
import { SearchComponent } from '../components/SearchController/SearchController.component';
import { PopularComponent } from '../components/PopularController/PopularController.component';
import { ViewComponent } from '../components/ViewController/ViewController.component';
import { ShowService } from '../services/ShowService.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'premieres',
    component: PremieresComponent,
    resolve: {
      shows: 'premieresResolver'
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
      shows: 'popularResolver'
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      show: 'viewResolver'
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
  providers: [
    {
      provide: 'premieresResolver',
      useFactory: (showService: ShowService) => () => showService.getPremieres(),
      deps: [ShowService]
    },
    {
      provide: 'popularResolver',
      useFactory: (showService: ShowService) => () => showService.getPopular(),
      deps: [ShowService]
    },
    {
      provide: 'viewResolver',
      useFactory: (showService: ShowService, route: ActivatedRoute) => () => showService.get(route.snapshot.params['id']),
      deps: [ShowService, ActivatedRoute]
    }
  ]
})
export class ConfigModule {}
