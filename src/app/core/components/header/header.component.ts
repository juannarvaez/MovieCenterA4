import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
 
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
import 'rxjs/add/observable/of';
 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from '../../services/search/search.service';
 
@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [SearchService],
})

export class HeaderComponent implements OnInit{

	private searchMovieTerms = new Subject<string>(); //Observable, There is an answer if there are changes in these variables
	private searchPersonTerms = new Subject<string>(); //Observable
	private pointer = -1;
	resultsMovies: Observable<any>; // Response information of movies
	resultsPersons: Observable<any>; //  Response information of persons
	location = 'MOVIES';

	view = {
		images: 'https://image.tmdb.org/t/p/w500',
	}

	constructor(
    	private searchService: SearchService,
    	private router: Router
    ) {}


	ngOnInit(): void{
		this.resultsMovies = this.searchMovieTerms
			.debounceTime(300)    //Wait 300 ms after search the term    
			.distinctUntilChanged()  //If there are no changes, dont do the request
			.switchMap(term => this.test(term,'/movie')) //Request and stored of the response
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); 
			});

		this.resultsPersons = this.searchPersonTerms
			.debounceTime(300)  
			.distinctUntilChanged()  
			.switchMap(term => this.test(term,'/person')) 
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); 
			});
	}

	/**Add word typed by user to searchMovieTerms and searchPersonTerms observables
   * @param {term:string} Word typed by user 
   * @return {:void} */
	searchTerm(term: string): void {
		
		this.searchMovieTerms.next(term);
		this.searchPersonTerms.next(term);
		
	}

	/**Do the request to the service 
   * @param {term:string} Word stored on  searchMovieTerms or searchPersonTerms observable
   * @return {:void} */
	test(term: string, specificSearch=""){

		return term ? this.searchService.search(term, specificSearch) : Observable.of<any>([])
	}


	/**Redirects to home 
   * @return {:void} */
	goHome():void{
		this.location='HOME';
		this.pointer = -1;
		this.router.navigate(['home']);
	}

	/**Redirects to movies section 
   * @return {:void} */
	goMovies():void {
		this.location='MOVIES';
		this.menuAnimation(-1);
		this.router.navigate(['movies']);
	}


	/**Redirects to a movie detail searched and selected in the search box
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	goMovieDetail(id_movie: number ):void {
		this.location='MOVIE DETAIL';
		this.router.navigate(['movie', String(id_movie)]);
		this.ngOnInit();
		let searchInput = <HTMLInputElement> document.getElementById('search-box');
		searchInput.value = '';
	}		
	

	/**Redirects to people section
   * @return {:void} */
	goPeople():void {
		this.location='PEOPLE';
		this.menuAnimation(-1);
		this.router.navigate(['people']);
	}

	/**Redirects to a person detail searched and selected in the search box
   * @param {id_person:number} unique identification for the person in the data base,  
   * @return {:void} */
	goPersonDetail(id_person: number ):void {
		this.location='PERSON DETAIL';
      	this.router.navigate(['person', String(id_person)]);
      	this.ngOnInit();
      	let searchInput = <HTMLInputElement>document.getElementById('search-box');
		searchInput.value = '';
  	}


	/**Redirects to Recommend me a movie section
   * @return {:void} */
  	goRecommend():void {
		this.location='RECOMMEND ME A MOVIE';
		this.menuAnimation(-1);
		this.router.navigate(['recommend']);
	}

	/**This method do the animation of menu buttom, it knows what to do by the pointer param
   * @param {pointer:number} when is -1 , menu bar have to be hidden, when is 1, have to be shown
   * @return {:void} */
	menuAnimation(pointer: number):void{
		this.pointer = this.pointer*pointer;
		console.log(this.pointer);
		let menuImgButton = document.getElementById('menu-img-button');
		let cancelImgButton = document.getElementById('cancel-img-button');
		let menuBarFormContainer = document.getElementById('form_container_menu');
		let menuBarSlide = document.getElementById('slide_menu');
		let separator = document.getElementById('separator');
		let searchBoxInput = document.getElementById('search-box');
		let locationTag = document.getElementById('location-tag'); 
		let searchComponent = document.getElementById('search-component'); 
		
		if(this.pointer == 1){
			menuImgButton.style.width = "24px";
			menuImgButton.style.height = "0px"; 
			menuImgButton.style.top= "-3px";
			menuImgButton.style.opacity= "0"
			menuBarSlide.style.marginLeft = "0%";
			separator.style.opacity = "0";
			searchBoxInput.style.width = "0%";
			searchBoxInput.style.marginLeft = "100%";
			locationTag.style.opacity = "0";
			searchComponent.style.zIndex = "-100";
			cancelImgButton.style.width = "16px";
			cancelImgButton.style.height = "16px"; 
			cancelImgButton.style.top= "0px";
			cancelImgButton.style.opacity= "1";
		}else{
			menuImgButton.style.width = "24px";
			menuImgButton.style.height = "24px"; 
			menuImgButton.style.top= "0px";
			menuImgButton.style.opacity= "1";
			cancelImgButton.style.width = "16px";
			cancelImgButton.style.height = "0px"; 
			cancelImgButton.style.top= "-5px";
			cancelImgButton.style.opacity= "0";
			menuBarSlide.style.marginLeft = "-100%";
			separator.style.opacity = "0.3";
			searchBoxInput.style.width = "100%";
			searchBoxInput.style.marginLeft = "0%";
			setTimeout(function(){ locationTag.style.opacity = "1"}, 500);
			searchComponent.style.zIndex = "0";
		}

	}

}
