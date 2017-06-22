import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
 
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from '../../services/search/search.service';
 
@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: [],
	providers: [SearchService],
})

export class HeaderComponent implements OnInit{

	resultsMovies: Observable<any>;
	resultsPersons: Observable<any>;
	private searchMovieTerms = new Subject<string>(); //es un observable, ante cambios en su definicion hay repuesta
	private searchPersonTerms = new Subject<string>();

	private pointer = -1;

	constructor(
    	private searchService: SearchService,
    	private router: Router
    ) {}

	ngOnInit(): void{
		this.resultsMovies = this.searchMovieTerms
			.debounceTime(300)    //Espere 300 ms después de cada pulsación antes de considerar el término    
			.distinctUntilChanged()  //No volver a consultar si no hay cambios en la consulta
			.switchMap(term => this.test(term,'/movie')) //term es la respuesta de lo archivado en serchTerms
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); //en caso de error para debugea
			});

		this.resultsPersons = this.searchPersonTerms
			.debounceTime(300)    //Espere 300 ms después de cada pulsación antes de considerar el término    
			.distinctUntilChanged()  //No volver a consultar si no hay cambios en la consulta
			.switchMap(term => this.test(term,'/person')) //term es la respuesta de lo archivado en serchTerms
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); //en caso de error para debugea
			});
	}

	searchTerm(term: string): void {
		
		this.searchMovieTerms.next(term);
		this.searchPersonTerms.next(term);
		// console.log("Observable");
		// console.log(term);
		
	}

	test(term: string, specificSearch=""){

		console.log("En el switchMap service response");
		//console.log(this.searchService.search(term));

		return term  
		//condicional devuelve la búsqueda HTTP observable 
		? this.searchService.search(term, specificSearch)

		//o el observable de los héroes vacíos si no había término de búsqueda
		: Observable.of<any>([])
	}

	goMovies():void {
		this.menuAnimation(-1);
		this.router.navigate(['home/movies']);
	}	
	
	goPeople():void {
		this.menuAnimation(-1);
		this.router.navigate(['home/people']);
	}

	menuAnimation(pointer: number):void{
		this.pointer = this.pointer*pointer;
		console.log(this.pointer);
		var menuImgButton = document.getElementById('menu-img-button');
		var cancelImgButton = document.getElementById('cancel-img-button');
		var menuBarFormContainer = document.getElementById('form_container_menu');
		var menuBarSlide = document.getElementById('slide_menu');
		var separator = document.getElementById('separator');
		// menuImgButton.style.width = "24px";
		// menuImgButton.style.height = "0px"; 
		if(this.pointer == 1){
			menuImgButton.style.width = "24px";
			menuImgButton.style.height = "0px"; 
			menuImgButton.style.top= "-3px";
			menuImgButton.style.opacity= "0"
			// menuBarFormContainer.style.width= "400px";
			menuBarSlide.style.marginLeft = "0%";
			separator.style.opacity = "0";

		}else{
			menuImgButton.style.width = "24px";
			menuImgButton.style.height = "24px"; 
			menuImgButton.style.top= "0px";
			menuImgButton.style.opacity= "1";
		}

		if(this.pointer == -1){
			cancelImgButton.style.width = "16px";
			cancelImgButton.style.height = "0px"; 
			cancelImgButton.style.top= "-5px";
			cancelImgButton.style.opacity= "0";
			menuBarSlide.style.marginLeft = "-100%";
			separator.style.opacity = "0.3";
		}else{
			cancelImgButton.style.width = "16px";
			cancelImgButton.style.height = "16px"; 
			cancelImgButton.style.top= "0px";
			cancelImgButton.style.opacity= "1";
		}
		


	}

	// gotoDetail(hero: Hero): void {
	// let link = ['/detail', hero.id];
	// this.router.navigate(link);
	// }

}
