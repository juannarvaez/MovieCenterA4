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
	@Input() movie={};

	constructor(
		private tmdbapiservice : TMDBAPIService,
		private route: ActivatedRoute,
		private location: Location
	){}

	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.tmdbapiservice.getMovieDetail(String(+params['id'])))
		.subscribe(response => this.movie = response);
	}


}