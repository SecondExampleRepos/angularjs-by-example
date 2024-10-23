// Converted from src/app.config.js

import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageValues } from '../constants/PageValues';

@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi({
      interceptors: [
        {
          provide: 'HTTP_INTERCEPTORS',
          useFactory: (router: Router, log: Console, q: PromiseConstructor) => {
            return {
              intercept: (req: any, next: any) => {
                return next.handle(req).toPromise().then(
                  (response: any) => response,
                  (error: any) => {
                    if (error.status === 401) {
                      log.error('You are unauthorised to access the requested resource (401)');
                    } else if (error.status === 404) {
                      log.error('The requested resource could not be found (404)');
                    } else if (error.status === 500) {
                      log.error('Internal server error (500)');
                    }
                    return q.reject(error);
                  }
                );
              }
            };
          },
          deps: [Router, Console, Promise]
        }
      ]
    }))
  ]
})
export class ConfigsModule {
  constructor() {
    // Listen to route changes
    const rootScope = {
      $on: (event: string, callback: () => void) => {
        if (event === '$routeChangeStart') {
          PageValues.loading = true;
        } else if (event === '$routeChangeSuccess') {
          PageValues.loading = false;
        }
        callback();
      }
    };

    rootScope.$on('$routeChangeStart', () => {});
    rootScope.$on('$routeChangeSuccess', () => {});
  }
}
