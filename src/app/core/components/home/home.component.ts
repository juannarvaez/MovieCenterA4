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

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [TMDBAPIService]
})

export class  HomeComponent implements OnInit{

	
	view = {
		movies: '',
		images: 'https://image.tmdb.org/t/p/w500',
	};

	constructor(
		private tmdbapiservice : TMDBAPIService,
		private router: Router
	){}

	ngOnInit():void{
		this.getMovies();
		
	}

	getMovies(): void{
		this.tmdbapiservice.getPopularMovies().subscribe(data => this.view.movies = data);
	}

	// goMovieDetile(id_movie: number ):void {
	// 	this.router.navigate(['home/detailMovie', String(id_movie)]);
	// }	

	searchMovie(): void{
		console.log("Popular movies: ");
		this.tmdbapiservice.getPopularMovies().subscribe(data => console.log(data));
		console.log("Movies detail: ");
		this.tmdbapiservice.getMovieDetail("166426").subscribe(data => console.log(data));
		console.log("Top movies: ");
		this.tmdbapiservice.getTopMovies().subscribe(data => console.log(data));
		console.log("Up coming movies: ");	
		this.tmdbapiservice.getUpcomingMovies().subscribe(data => console.log(data));
	}

}