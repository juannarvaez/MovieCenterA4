import { Component, Input } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
	selector: 'movie-tile',
	templateUrl: './movie-tile.component.html',
	styleUrls: ['./movie-tile.component.css']
})

export class  MovieTileComponent{

	@Input() movie: any;

	view = {
		images: 'https://image.tmdb.org/t/p/w500',
	}

	constructor(
		private router: Router
	){}

	/**Redirect to movie detail section
	* @param {id_movie:number} unique identification for the movie in the data base,  
   	* @return {:void} */
	goMovieDetail(id_movie: number ):void {
		this.router.navigate(['movie', String(id_movie)]);
	}	

}
