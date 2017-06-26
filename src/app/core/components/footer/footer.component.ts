import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})

export class FooterComponent implements OnInit{

	constructor(
    	private router: Router
    ) {}

	ngOnInit(): void{

	}

	goAboutMe():void{
		this.router.navigate(['aboutme']);
	}

}