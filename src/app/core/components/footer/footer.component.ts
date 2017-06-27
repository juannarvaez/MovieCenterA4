import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})

export class FooterComponent{

	constructor(
    	private router: Router
    ) {}

	/**Redirect to juan narvaez information profile section
   	* @return {:void} */
	goAboutMe():void{
		window.scrollTo(0, 0);
		this.router.navigate(['aboutme']);
	}

}