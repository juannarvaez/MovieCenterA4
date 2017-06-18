import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; 
import { RouterModule }   from '@angular/router';
import { HttpModule,  JsonpModule }    from '@angular/http';
 

import { AppComponent }  from './app.component';

import { HomeComponent } from './core/components/home/home.component'
import {TMDBAPIService} from './core/services/tmdb/tmdb-api.service'

@NgModule({
	imports:[ 
		BrowserModule,
		FormsModule, 
		HttpModule,
		JsonpModule,
	],
	declarations:[
		AppComponent,
		HomeComponent
	],
	providers: [
		TMDBAPIService
	],
	bootstrap:[
		AppComponent
	]
})
export class AppModule { }
