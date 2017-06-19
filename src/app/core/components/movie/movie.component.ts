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
	private pointer = 0;

	@Input() view = {
			movie: {videos: {results: [ {type:'', key:''}] } },
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

	getTrailer():string{
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

        // var limit = $('.form_container .slide').length;

        // this.pointer = (direction == 'right') ? this.pointer + 1 : this.pointer-1;
        // this.pointer = (direction >= limit) ? 0 : this.pointer ;
        // this.pointer = (direction < 0 ) ? limit - 1 : this.pointer ;

        // var mensaje = -(this.pointer * $('.form_container .slide').width())+"px";
        // console.log(mensaje);

        // $('.form_container .slide_container').animate({
        //     'margin-left': -(this.pointer * $('.form_container .slide').width())+"px"
        // });  

    }



}