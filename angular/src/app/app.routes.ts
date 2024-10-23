// Converted from angular/src/app/modules/config.routing.module.ts

import { ShowService } from './services/ShowService.service';

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
      show: (route) => ShowService.get(route.params.id)
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
