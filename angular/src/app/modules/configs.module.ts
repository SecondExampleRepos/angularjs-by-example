// Converted from src/app.config.js

import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageValues } from '../constants/PageValues';

@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: 'HTTP_INTERCEPTORS',
      useFactory: (router: Router, pageValues: typeof PageValues) => {
        return {
          intercept: (req: any, next: any) => {
            return next.handle(req).pipe(
              tap(
                (event: any) => {
                  // Request completed successfully
                },
                (error: any) => {
                  if (error.status === 401) {
                    console.error('You are unauthorised to access the requested resource (401)');
                  } else if (error.status === 404) {
                    console.error('The requested resource could not be found (404)');
                  } else if (error.status === 500) {
                    console.error('Internal server error (500)');
                  }
                }
              )
            );
          }
        };
      },
      deps: [Router, PageValues],
      multi: true
    }
  ]
})
export class ConfigsModule {}
