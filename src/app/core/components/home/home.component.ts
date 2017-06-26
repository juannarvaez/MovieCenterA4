import { Component } from '@angular/core';
import { RouterModule, Router }            from '@angular/router';


@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class  HomeComponent{
	
	constructor(
		private router: Router
	){}


	goMovies():void {
		this.router.navigate(['movies']);
	}

}