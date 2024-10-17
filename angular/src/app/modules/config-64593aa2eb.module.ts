// Converted from src/app.routes.js

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeControllerComponent } from '../components/home/home.component';
import { PremieresControllerComponent } from '../components/premieres/premieres.component';
import { SearchControllerComponent } from '../components/search/search.component';
import { PopularControllerComponent } from '../components/popular/popular.component';
import { ViewControllerComponent } from '../components/view/view.component';
import { ShowService } from '../services/show.service';

const routes: Routes = [
  { path: '', component: HomeControllerComponent },
  { 
    path: 'premieres', 
    component: PremieresControllerComponent,
    resolve: { shows: 'premieresResolver' }
  },
  { path: 'search', component: SearchControllerComponent },
  { path: 'search/:query', component: SearchControllerComponent },
  { 
    path: 'popular', 
    component: PopularControllerComponent,
    resolve: { shows: 'popularResolver' }
  },
  { 
    path: 'view/:id', 
    component: ViewControllerComponent,
    resolve: { show: 'viewResolver' }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ShowService,
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
        return showService.get(Number(id));
      },
      deps: [ShowService, ActivatedRoute]
    }
  ]
})
export class ConfigModule {}
