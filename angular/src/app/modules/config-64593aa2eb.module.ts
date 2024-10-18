// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home.component';
import { PremieresComponent } from '../components/premieres.component';
import { SearchComponent } from '../components/search.component';
import { PopularComponent } from '../components/popular.component';
import { ViewComponent } from '../components/view.component';
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
      useFactory: (showService: ShowService, route: ActivatedRoute) => () => {
        const id = route.snapshot.paramMap.get('id');
        return showService.get(id);
      },
      deps: [ShowService, ActivatedRoute]
    }
  ]
})
export class ConfigModule {}
