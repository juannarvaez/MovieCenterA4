import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './core/components/movie/movie.component';
import { HomeComponent } from './core/components/home/home.component';
import { PersonComponent } from './core/components/person/person.component';
import { PeopleComponent } from './core/components/people/people.component';
import { RecommendComponent } from './core/components/recommend/recommend.component';
import { AboutmeComponent } from './core/components/aboutme/aboutme.component';


const routes: Routes = [
 	{ path: '', redirectTo: 'movies', pathMatch: 'full' },
 	{ path: 'movies', component: HomeComponent },
 	{ path: 'people', component: PeopleComponent },
 	{ path: 'recommend', component: RecommendComponent },
	{ path: 'movie/:id', component: MovieComponent },
	{ path: 'person/:id', component: PersonComponent },
	{ path: 'aboutme', component: AboutmeComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}