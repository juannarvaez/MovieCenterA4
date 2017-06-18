import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
	selector: 'movie-tile',
	templateUrl: './movie-tile.component.html',
	styleUrls: []
})

export class  MovieTileComponent implements OnInit{

	
	view = {
		imagesUrl: 'url'
	}

	constructor(

	){}

	ngOnInit():void{
		
	}

}
