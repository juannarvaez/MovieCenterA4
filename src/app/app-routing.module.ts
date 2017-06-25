import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './core/components/movie/movie.component';
import { HomeComponent } from './core/components/home/home.component';
import { PersonComponent } from './core/components/person/person.component';
import { PeopleComponent } from './core/components/people/people.component';
import { RecommendComponent } from './core/components/recommend/recommend.component';


const routes: Routes = [
 	{ path: '', redirectTo: '/home/movies', pathMatch: 'full' },
 	{ path: 'home/movies', component: HomeComponent },
 	{ path: 'home/people', component: PeopleComponent },
 	{ path: 'home/recommend', component: RecommendComponent },
	{ path: 'home/detailMovie/:id', component: MovieComponent },
	{ path: 'home/person/:id', component: PersonComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}