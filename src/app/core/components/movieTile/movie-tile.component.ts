import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
	selector: 'movie-tile',
	templateUrl: './movie-tile.component.html',
	styleUrls: []
})

export class  MovieTileComponent implements OnInit{

	@Input() movie: any;

	view = {
		imagesUrl: 'url'
	}

	constructor(

	){}

	ngOnInit():void{
		console.log("movie-tile");
		console.log(this.movie);
	}

}
