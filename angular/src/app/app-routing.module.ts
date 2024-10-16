import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarControllerComponent } from './components/BarController/BarController.component';
import { HomeControllerComponent } from './components/HomeController/HomeController.component';
import { PopularControllerComponent } from './components/PopularController/PopularController.component';
import { PremieresControllerComponent } from './components/PremieresController/PremieresController.component';
import { SearchControllerComponent } from './components/SearchController/SearchController.component';
import { ViewControllerComponent } from './components/ViewController/ViewController.component';

const routes: Routes = [
  { path: 'bar', component: BarControllerComponent },
  { path: 'home', component: HomeControllerComponent },
  { path: 'popular', component: PopularControllerComponent },
  { path: 'premieres', component: PremieresControllerComponent },
  { path: 'search', component: SearchControllerComponent },
  { path: 'view', component: ViewControllerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
