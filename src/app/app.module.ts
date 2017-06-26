import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; 
import { RouterModule }   from '@angular/router';
import { HttpModule,  JsonpModule }    from '@angular/http';
 
import { AppRoutingModule }     from './app-routing.module';

import { SafeVideo } from './core/filters/safeVideo/filter.safe-video';
import { Percentage } from './core/filters/percentage/filter.percentage';

import { TMDBAPIService } from './core/services/tmdb/tmdb-api.service';
import { SearchService } from './core/services/search/search.service';

import { AppComponent }  from './app.component';
import { HomeComponent } from './core/components/home/home.component'
import { MoviesComponent } from './core/components/movies/movies.component';
import { MovieTileComponent } from './core/components/movieTile/movie-tile.component'
import { MovieComponent } from './core/components/movie/movie.component'
import { PersonComponent } from './core/components/person/person.component'
import { FooterComponent } from './core/components/footer/footer.component'
import { HeaderComponent } from './core/components/header/header.component'
import { PeopleComponent } from './core/components/people/people.component';
import { RecommendComponent } from './core/components/recommend/recommend.component';
import { AboutmeComponent } from './core/components/aboutme/aboutme.component';




@NgModule({
	imports:[ 
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		AppRoutingModule
	],
	declarations:[
		AppComponent,
		HomeComponent,
		MoviesComponent,
		MovieTileComponent,
		MovieComponent,
		PersonComponent,
		PeopleComponent,
		HeaderComponent,
		FooterComponent,
		RecommendComponent,
		AboutmeComponent,
		Percentage,
		SafeVideo
	],
	providers: [
		TMDBAPIService,
		SearchService
	],
	bootstrap:[
		AppComponent
	]
})
export class AppModule { }
