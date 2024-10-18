import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Converted from src/app.js
// Converted from src/app.routes.js

import { provideRouter, withInterceptorsFromDi } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './app/components/home/home.component';
import { PremieresComponent } from './app/components/premieres/premieres.component';
import { SearchComponent } from './app/components/search/search.component';
import { PopularComponent } from './app/components/popular/popular.component';
import { ViewComponent } from './app/components/view/view.component';
import { ShowService } from './app/services/ShowService-60e6084c07.service';

const routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'premieres', 
    component: PremieresComponent,
    resolve: { shows: () => ShowService.getPremieres() }
  },
  { path: 'search', component: SearchComponent },
  { path: 'search/:query', component: SearchComponent },
  { 
    path: 'popular', 
    component: PopularComponent,
    resolve: { shows: () => ShowService.getPopular() }
  },
  { 
    path: 'view/:id', 
    component: ViewComponent,
    resolve: { show: (route) => ShowService.get(route.params.id) }
  },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ],
  ...appConfig
}).catch((err) => console.error(err));
