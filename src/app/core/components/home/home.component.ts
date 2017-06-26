import { Component, OnInit } from '@angular/core';
import { RouterModule, Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	// providers: [TMDBAPIService]
})

export class  HomeComponent implements OnInit{

	
	view = {
		movies: '',
		images: 'https://image.tmdb.org/t/p/w500',
	};

	constructor(
		// private tmdbapiservice : TMDBAPIService,
		private router: Router
	){}

	ngOnInit():void{
		
	}

	goMovies():void {
		this.router.navigate(['movies']);
	}

}