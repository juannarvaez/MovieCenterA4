import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'


@Component({
	selector: 'movie',
	templateUrl: './movie.component.html',
	styleUrls: [],
})

export class MovieComponent implements OnInit{

	private apiYoutube = 'https://www.youtube.com/embed/';

	@Input() view = {
			movie: {},
			images: 'https://image.tmdb.org/t/p/w500'
		}

	constructor(
		private tmdbapiservice : TMDBAPIService,
		private route: ActivatedRoute,
		private location: Location
	){}

	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.tmdbapiservice.getMovieDetail(String(+params['id'])))
		.subscribe(response => this.view.movie = response);
	}

	getTrailer():void{
		var trailer = '';

		var index =  this.view.movie.videos.results.length;
        var results = this.view.movie.videos.results;


        for (var i = 0; i < index; i++) {
            if( results[i].type == "Trailer"){
                trailer = this.apiYoutube+results[i].key;
                break;   
            }                   
        }

        return trailer;
	}

	movieSlider(direction: string): void{

        var limit = $('.form_container .slide').length;

        pointer = (direction == 'right') ? pointer + 1 : pointer-1;
        pointer = (direction >= limit) ? 0 : pointer ;
        pointer = (direction < 0 ) ? limit - 1 : pointer ;

        var mensaje = -(pointer * $('.form_container .slide').width())+"px";
        console.log(mensaje);

        $('.form_container .slide_container').animate({
            'margin-left': -(pointer * $('.form_container .slide').width())+"px"

        });

        

    }



}