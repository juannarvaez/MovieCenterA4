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

	/**Redirects to movies section 
   * @return {:void} */
	goMovies():void {
		window.scrollTo(0, 0);
		this.router.navigate(['movies']);
	}

	/**Redirects to people section
   * @return {:void} */
	goPeople():void {
		window.scrollTo(0, 0);
		this.router.navigate(['people']);
	}

	/**Redirects to Recommend me a movie section
   * @return {:void} */
  	goRecommend():void {
  		window.scrollTo(0, 0);
		this.router.navigate(['recommend']);
	}
}