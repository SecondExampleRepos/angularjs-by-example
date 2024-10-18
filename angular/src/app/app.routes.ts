import { Routes } from '@angular/router';

// Converted from angular/src/app/modules/config-64593aa2eb.routing.module.ts

export const routes: Routes = [
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
