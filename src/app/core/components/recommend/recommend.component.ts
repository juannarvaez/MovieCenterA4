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
import { TMDBAPIService } from '../../services/tmdb/tmdb-api.service'

@Component({
	selector: 'recommend',
	templateUrl: './recommend.component.html',
	styleUrls: [],
	providers: [SearchService, TMDBAPIService]
})

export class  RecommendComponent implements OnInit{
	
	private dataSet =  new Array();
	// [
	// 	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,40],
	// 	[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,13,14,15,16,17,18],
	// 	[34,35,36,37,38,39,6,7,8,9,10,11,12,13,46,47,48,49,50,51,52,53,],
	// 	[2,1,12,13,14,15,16,17,6,7,8,9,25,26,27,28,50,51,52,53,54,55,56,57,],
	// 	[1223,33,4,33,1,6,22,56621,2,3,4,5,6,7,8,9,10,]
	// ];
	private minSupport = 0;
	private itemSetsCollectionTables= new Array();
	private numberOfSelectedMovies = 0;

	private searchMovieTerms = new Subject<string>(); //es un observable, ante cambios en su definicion hay repuesta
	private searchPersonTerms = new Subject<string>();

	resultsMovies: Observable<any>;
	selectedMovies = new Array();	

	view = {
		images: 'https://image.tmdb.org/t/p/w500',
	}

	constructor(
		private tmdbapiservice : TMDBAPIService,
    	private searchService: SearchService,
    	private router: Router
    ) {}

	ngOnInit():void{
		this.resultsMovies = this.searchMovieTerms
			.debounceTime(300)    //Espere 300 ms después de cada pulsación antes de considerar el término    
			.distinctUntilChanged()  //No volver a consultar si no hay cambios en la consulta
			.switchMap(term => this.test(term,'/movie')) //term es la respuesta de lo archivado en serchTerms
			.catch(error => {
				console.log(error);
				return Observable.of<any>([]); //en caso de error para debugea
			});
		
	}

	searchTerm(term: string): void {
		
		this.searchMovieTerms.next(term);
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


	getMovieDetail(id_movie:string):void{

		this.numberOfSelectedMovies +=1;
		
		//if(this.numberOfSelectedMovies<=5){
			this.tmdbapiservice.getMovieDetailRecommend(id_movie).subscribe(data => this.selectedMovies.push(data));
		//}
		
		let searchInput = <HTMLInputElement> document.getElementById('search-box-recommend');
		searchInput.value = '';
		this.ngOnInit();
	}

	setIdsSimilarMovies():void{
		let length = this.selectedMovies.length;
		this.minSupport = length%2 == 0 ? length/2 :Math.ceil(length/2);
		if(this.minSupport == 1 && length==2){this.minSupport = 2;}
		console.log(this.minSupport);

		for (var i = 0; i < length ; i++){
			
			let similarMoviesId = new Array();
			let auxLength = this.selectedMovies[i]["similar"]["results"].length;
			console.log(this.selectedMovies[i]["similar"]["results"]);	
			for (var j = 0; j < auxLength ; j++){
				similarMoviesId.push(this.selectedMovies[i]["similar"]["results"][j]["id"]);
			}
			console.log(similarMoviesId);
			this.dataSet.push(similarMoviesId);		
		}
	}

	associationAlgorithm():void{
		// this.setIdsSimilarMovies();

		if(this.selectedMovies.length>1){

			let dataSetLength = this.dataSet.length;		
			let auxKeysItemSet= new Array(); 
			let itemSetSup={};
			
			// AGRUPAR TODOS LOS RESULTADOS PARA VER LAS KEYS INVOLUCRADAS
			for (var i = 0; i < dataSetLength ; i++){
				auxKeysItemSet = auxKeysItemSet.concat(this.dataSet[i]);			
			}

			// FILTRAR LAS KEYS PARA QUE NO SE REPITAN Y ASI PODER HACER EL CONTEO EN LA TABLA HASH
			// unique filter a=elemente b=index c=array
			auxKeysItemSet = auxKeysItemSet.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
			
			//ORDENAR LAS KEYS
			// console.log(auxKeysItemSet);
			auxKeysItemSet.sort(function(a, b){ return a-b});
			console.log("Etiquetas de itemsets");
			console.log(auxKeysItemSet);


			//CREAR EL PRIMER ITEM SET PARA CONTEO
			// console.log(auxKeysItemSet);
			

			for (var i = 0; i < auxKeysItemSet.length;  i++) {
				// console.log(auxKeysItemSet[i]);
				itemSetSup[auxKeysItemSet[i]]=0;
			}

			//HACER EL CONTEO
			for (var i = 0; i < dataSetLength; i++) {
				let auxLength = this.dataSet[i].length;
				let data = this.dataSet[i];
				for (var j = 0; j < auxLength; j++) {
					itemSetSup[ data[j] ] += 1;
				}
				
			}

			//ELIMINAR LO QUE NO CUMPLE CON EL MIN SUPPORT ITEMSET
			let itemSetkeys = Object.keys( itemSetSup );
			let itemSetLength = itemSetkeys.length;
			

			console.log("Hash con conteo itemset sup ");
			console.log(itemSetSup);


			for (var i = 0; i < itemSetLength; i++) {
				if(itemSetSup[itemSetkeys[i]] < this.minSupport){delete itemSetSup[itemSetkeys[i]]}	
			}



			//HACER LAS COMBINACIONES DE LOS QUE PASARON EL MIN SUPPORT
			console.log("Itemsets que pasaron el min support ");
			console.log(itemSetSup);

			this.itemSetsCollectionTables.push(itemSetSup);

			let iterationNumber = 1;



			// ITERACIONES DEL ALGORITMO
			

			while(iterationNumber<4 ){
			// while(false ){

			// while(itemSetkeys.length>2 ){

				
				iterationNumber++;
				console.log("================  ITERACION # "+iterationNumber+"  ================");

				itemSetkeys = Object.keys( itemSetSup );
				// console.log(itemSetkeys);
				itemSetSup = {};


				for (var i = 0; i < itemSetkeys.length; i++) {
					
					let auxItemsetString = new Array();
					
					for (var j = i; j < itemSetkeys.length; j++) {
						
						if(itemSetkeys[j+1]){
							// console.log("========================");
							// console.log("en el concat");
							// console.log( itemSetkeys[i].split("-"));
							// console.log( itemSetkeys[j+1].split("-"));
							// console.log("========================");
						 	
						 	auxItemsetString = itemSetkeys[i].split("-").concat(itemSetkeys[j+1].split("-"));
						 	auxItemsetString = auxItemsetString.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
						 						 	
						}

						let key = '';

					 	if(auxItemsetString.length <= iterationNumber && auxItemsetString.length > 0){

					 		// console.log("Desordenado ");
					 		// console.log(auxItemsetString);
					 		
					 		let auxItemsetNumber = auxItemsetString.map(function(a){return parseInt(a)});
					 		auxItemsetNumber = auxItemsetNumber.sort(function(a, b){ return a-b});
					 		
					 		// console.log("Ordenado ");
					 		// console.log(auxItemsetNumber);
					 		
					 		key = auxItemsetNumber.join("-");
					 		itemSetSup[key] = 0;
					 		// console.log(key);
					 	}
					}
					
					
				}
		//==
				// let perms = this.firstEspecialPermutation(itemSetkeys);
				console.log("Permutaciones (itemsets):");
				console.log(itemSetSup);

				// perms = Object.keys(itemSetSup);
				// itemSetSup={};
				itemSetkeys = Object.keys( itemSetSup );
				for (var i = 0; i <itemSetkeys.length ; i++) {
					// console.log("paso 1");
					itemSetSup[itemSetkeys[i]] = this.countItemSets(itemSetkeys[i].split("-"));
				 }

				console.log("Conteo de ocurrencias de los itemsets: ");
				console.log(itemSetSup);
				
				
				itemSetLength = itemSetkeys.length;

				for (var i = 0; i < itemSetLength; i++) {
					if(itemSetSup[itemSetkeys[i]] < this.minSupport){delete itemSetSup[itemSetkeys[i]]}	
				}

				console.log("Itemsets que pasaron el min support: "+ this.minSupport );
				console.log(itemSetSup);
				console.log("Cantidad de etiquetas:"+Object.keys( itemSetSup ).length);
				this.itemSetsCollectionTables.push(itemSetSup);

			}
		}

		// for (var i = 0; i < this.itemSetsCollectionTables.length; i++) {
		// 	console.log(this.itemSetsCollectionTables[i]);	
		// }

		let lastIteration = Object.keys(this.itemSetsCollectionTables.pop());
		console.log(lastIteration);
		let result = new Array();

		for (var i = 0; i < lastIteration.length ; i++) {
			result = result.concat(lastIteration[i].split("-"));
		}

		result = result.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
		console.log(result);
	}

	firstEspecialPermutation(movieIds:Array<any>):Array<any>{
		let results = new Array();
		let length = movieIds.length;


		for (var i = 0; i < length; i++) {

			for (var j = i; j < length; j++) {
				if(movieIds[j+1]){
					results.push( movieIds[i]+"-"+movieIds[j+1]);
				}else{
					break;
				}
			}
			
		}

		return results;
	}

	countItemSets(perm:Array<string>):number{
		// console.log("paso 2");
		let length = this.dataSet.length;
		let result = 0;
		for (var i =0; i < length; i++) {
			// console.log("paso 3");
			result += this.countItemSet(this.dataSet[i], perm);			
		}
		return result;
		
	}

	countItemSet(data:Array<number>, items:Array<string>):number{
		// console.log("paso 4");
		let itemLength = items.length;
		// console.log("paso 4.1");
		let dataLength = data.length;
		// console.log("paso 4.2");
		let flag = 0;

		for (var i = 0; i < itemLength; i++) {
			// console.log("paso 5");
			for (var j = 0; j < dataLength; j++) {
				// console.log("paso 6");
				if(data[j]+"" == items[i]){
					flag++;
				}
			}
		}

		// console.log("flag: "+flag);
		return flag == itemLength ?  1 : 0;
	}


}