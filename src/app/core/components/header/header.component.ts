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

	results: Observable<any>;
	private searchTerms = new Subject<string>(); //es un observable, ante cambios en su definicion hay repuesta

	constructor(
    	private searchService: SearchService,
    	private router: Router
    ) {}

	ngOnInit(): void{
		this.results = this.searchTerms
			.debounceTime(300)    //Espere 300 ms después de cada pulsación antes de considerar el término    
			.distinctUntilChanged()  //No volver a consultar si no hay cambios en la consulta
			.switchMap(term => this.test(term)) //term es la respuesta de lo archivado en serchTerms
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); //en caso de error para debugea
			});
	}

	searchTerm(term: string): void {
		
		this.searchTerms.next(term);

		console.log(term);
		console.log("Observable");
		console.log(this.searchTerms);
	}

	test(term: string){

		console.log("En el switchMap");
		console.log(term);
		return term  
		//condicional devuelve la búsqueda HTTP observable 
		? this.searchService.search(term)

		//o el observable de los héroes vacíos si no había término de búsqueda
		: Observable.of<any>([])
	}

	// gotoDetail(hero: Hero): void {
	// let link = ['/detail', hero.id];
	// this.router.navigate(link);
	// }

}
