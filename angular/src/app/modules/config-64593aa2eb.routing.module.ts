// Converted from angular/src/app/modules/config-64593aa2eb.routing.module.ts

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {}
