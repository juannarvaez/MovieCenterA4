import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
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

    actorInfo: any;

	@Input() view = {
			movie: {
				videos: { results: [ {type:'', key:''} ] },
				credits: { cast: [ {id:'', profile_path: ''} ] },
			},
			actor: {id:'', profile_path: ''},
			images: 'https://image.tmdb.org/t/p/w500'
		}


	constructor(
		private tmdbapiservice : TMDBAPIService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
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

	goMovieDetile(id_movie: number ):void {
		this.router.navigate(['home/detailMovie', String(id_movie)]);
	}

	showActor(id_actor: string):void{
        this.tmdbapiservice.getDetailPerson(id_actor).subscribe(response=> this.actor_info = response);
               
        for (var i in this.view.movie.credits.cast){
            if (this.view.movie.credits.cast[i].id == id_actor) {
                this.view.actor = this.view.movie.credits.cast[i];
                console.log(this.view.actor);
                break;
            }
        }


        var actorPanel = document.getElementById('actorDetailPanel');
        var actorPanelPicture = document.getElementById('actorDetailPanelPicture');
        actorPanel.style.display='block';
        actorPanelPicture.style.backgroundRepeat = 'no-repeat';
        actorPanelPicture.style.backgroundImage = "url("+ this.view.images + this.view.actor.profile_path +")";

        // $("#actorDetailPanel").css({
        //    'background-image': "url(https:"+ $scope.view.images + $scope.view.actor.profile_path +")",
        //    'background-repeat': 'no-repeat',
        //    'display':'block',
        // });
        
    }

    closeActorDetail():void{
        document.getElementById("actorDetailPanel").style.display='none';
    }

	movieSlider(direction: string): void{
		//Slide has to be a NodeListOf<any> instead NodeListOf<Element> to avoid div_width compilation error
        var slide: NodeListOf<any> = document.getElementsByClassName('slide');
        var limit = slide.length;
        var div_width = parseInt(slide[0].style.width.substring(0,3))+8;
        console.log("limit: " + limit);

        this.pointer = (direction == 'right') ? this.pointer + 1 : this.pointer-1;
        // this.pointer = (this.pointer >= limit) ? 0 : this.pointer ;
        // this.pointer = (this.pointer < 0 ) ? limit - 1 : this.pointer ;


        var slide_container = document.getElementById('slide_container');
        console.log("widht: "+div_width);

        var move_left = -1*this.pointer*div_width;
        console.log("move: " + move_left);

        slide_container.style.marginLeft = move_left+'px';
        // slide_container.style.margin = '0px 0px 0px '+move_left+'px';
        slide_container.style.color = 'red';
		console.log(typeof slide_container);

    }



}