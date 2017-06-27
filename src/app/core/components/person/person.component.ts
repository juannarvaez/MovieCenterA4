import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'


@Component({
	selector: 'person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.css'],
})

export class PersonComponent implements OnInit{

	@Input() person: any;

	view = {
		images: 'https://image.tmdb.org/t/p/w500'
	}

	constructor(
		private tmdbapiservice : TMDBAPIService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	){}

	/**Load person information
   * @return {:void} */
	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.tmdbapiservice.getDetailPerson(String(+params['id'])))
		.subscribe(response => this.person = response);
	}

	/**Redirects to a movie detail
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	getProfileImage():string{
		let limit = this.person.images.profiles.length;
		return limit == 1 ? 
			this.person.images.profiles[0].file_path :  
			this.person.images.profiles[1].file_path;

	}

	/**Redirects to a movie detail
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	goMovieDetail(id_movie: number ):void {
		this.router.navigate(['movie', String(id_movie)]);
	}

	// detail():void{
	// 	console.log(this.person);
	// }

}