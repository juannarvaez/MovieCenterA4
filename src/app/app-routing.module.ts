import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './core/components/movie/movie.component'
import { HomeComponent } from './core/components/home/home.component'

const routes: Routes = [
 	{ path: '', redirectTo: '/home', pathMatch: 'full' },
 	{ path: 'home', component: HomeComponent },
	{ path: 'home/detailMovie/:id', component: MovieComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}