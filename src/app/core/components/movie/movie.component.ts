import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'


@Component({
	selector: 'movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css'],
})

export class MovieComponent implements OnInit{

	private apiYoutube = 'https://www.youtube.com/embed/';
	private pointer = 0; //slider var
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

     /**Loads movie information
   * @return {:void} */
	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.tmdbapiservice.getMovieDetail(String(+params['id'])))
		.subscribe(response => this.view.movie = response);
	}

    /**Search the trailer from the videos results and returns the key
   * @return {:string} youtube url of trailer video for this movie*/
	getTrailer():string{
		let trailer = '';
		let index =  this.view.movie.videos.results.length;
        let results = this.view.movie.videos.results;
        for (var i = 0; i < index; i++) {
            if( results[i].type == "Trailer"){
                trailer = this.apiYoutube+results[i].key;
                break;   
            }                   
        }
        return trailer;
	}

    /**Redirects to a movie detail selected from slider
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	goMovieDetail(id_movie: number ):void {
        window.scrollTo(0, 0);
		this.router.navigate(['movie', String(id_movie)]);
	}

    /**Redirects to people detail information panel, by using Go to detail button
   * @return {:void} */
    goPersonDetail(id_person: number ):void {
        this.router.navigate(['person', String(id_person)]);
    }

    /**Search and shows the actor information on the actor panel
   * @param {id_actor:string} unique identification for the person in the data base,  
   * en el componente siguiente
   * @return {:void} */
	showActor(id_actor: string):void{
        this.tmdbapiservice.getDetailPerson(id_actor).subscribe(response=> this.actorInfo = response);
               
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
    }

    /**Close actor panel
   * @return {:void} */    
    closeActorDetail():void{
        document.getElementById("actorDetailPanel").style.display='none';
    }

    /**Slider javascript logic to see similar movies on the movie detail panel
   * @param {direction:string} Indicates the move direction 
   * en el componente siguiente
   * @return {:void} */
	movieSlider(direction: string): void{
        var slide: NodeListOf<any> = document.getElementsByClassName('slide');
        var limit = slide.length;
        var div_width = parseInt(slide[0].clientWidth)+8;
        this.pointer = (direction == 'right') ? this.pointer + 1 : this.pointer-1;
        var slide_container = document.getElementById('slide_container');
        var move_left = -1*this.pointer*div_width;
        slide_container.style.marginLeft = move_left+'px';
        slide_container.style.color = 'red';
    }

}