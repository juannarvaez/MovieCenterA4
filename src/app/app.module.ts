import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; 
import { RouterModule }   from '@angular/router';
import { HttpModule,  JsonpModule }    from '@angular/http';
 
import { SafeVideo } from './core/filters/safeVideo/filter.safe-video';

import { AppComponent }  from './app.component';

import {TMDBAPIService} from './core/services/tmdb/tmdb-api.service'

import { HomeComponent } from './core/components/home/home.component'
import { MovieTileComponent } from './core/components/movieTile/movie-tile.component'

@NgModule({
	imports:[ 
		BrowserModule,
		FormsModule, 
		HttpModule,
		JsonpModule,
	],
	declarations:[
		AppComponent,
		HomeComponent,
		MovieTileComponent,
		SafeVideo
	],
	providers: [
		TMDBAPIService
	],
	bootstrap:[
		AppComponent
	]
})
export class AppModule { }
