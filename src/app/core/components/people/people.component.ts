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
	
	ngOnInit():void{

	}
}