import { AppComponent } from './app/app.component';

// Converted from src/app.js
import { provideRouter, withInterceptorsFromDi } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ...appConfig.providers
  ]
}).catch((err) => console.error(err));
