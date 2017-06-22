import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'


@Component({
	selector: 'people',
	templateUrl: './people.component.html',
	styleUrls: [],
})

export class PeopleComponent implements OnInit{
	
	view = {
		people: '',
		images: 'https://image.tmdb.org/t/p/w500',
	}
	

	constructor(
		private tmdbapiservice : TMDBAPIService,
		private router: Router
	){}

	ngOnInit():void{
		this.getPeople();
	}

	getPeople(): void{
		this.tmdbapiservice.getPopularPersons().subscribe(data => this.view.people = data);
	}

	substringPorcent(porcent:string):string{
		return porcent.toString().substring(0,4)+'%';
	}
}