// Converted from src/app.js
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app/app.routes';
import { BarComponent } from './app/components/bar/bar.component';
import { ShowDirective } from './app/directives/show.directive';
import { NgEnterDirective } from './app/directives/ng-enter.directive';
import { PageValuesService } from './app/services/page-values.service';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    ShowDirective,
    NgEnterDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    PageValuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutes),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
