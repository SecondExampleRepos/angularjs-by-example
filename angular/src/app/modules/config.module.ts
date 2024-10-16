// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PremieresComponent } from '../components/premieres/premieres.component';
import { SearchComponent } from '../components/search/search.component';
import { PopularComponent } from '../components/popular/popular.component';
import { ViewComponent } from '../components/view/view.component';
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
      shows: ShowService.prototype.getPremieres
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
      shows: ShowService.prototype.getPopular
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      show: (route: ActivatedRouteSnapshot) => ShowService.prototype.get(route.params['id'])
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
