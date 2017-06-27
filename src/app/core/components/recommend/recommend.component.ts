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
	styleUrls: ['./recommend.component.css'],
	providers: [SearchService, TMDBAPIService]
})

export class  RecommendComponent implements OnInit{
	
	private dataSet =  new Array(); //Movie ids selected to do the algorithm
	private minSupport = 0; // var used in the algorithm
	private itemSetsCollectionTables= new Array(); //Results of the loops
	private numberOfSelectedMovies = 0; //Number of movie selected
	private searchMovieTerms = new Subject<string>(); //Observable, There is an answer if there are changes in these variables
	private searchPersonTerms = new Subject<string>();

	selectedMovies = new Array(); //Movies selected to do the algorithm
	idsSelectedMovies = new Array(); //Ids of the movies selected
	RecommendedMovies = new Array(); //Results of the algorithm
	resultsMovies: Observable<any>; //Results of the search box
		

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
			.debounceTime(300)    //Wait 300 ms after search the term 
			.distinctUntilChanged()  //If there are no changes, dont do the request
			.switchMap(term => this.test(term,'/movie')) //Request and stored of the response
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
	}

	/**Do the request to the service 
   * @param {term:string} Word stored on  searchMovieTerms or searchPersonTerms observable
   * @return {:void} */
	test(term: string, specificSearch=""){
		return term ? this.searchService.search(term, specificSearch): Observable.of<any>([])
	}
	
	/**Redirects to a movie detail of the results of the algorithm
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	goMovieDetail(id_movie: number ):void {
		this.clearData();
		this.router.navigate(['movie', String(id_movie)]);
	}


	/**Get the info of the movie selected and added it to the slectedMovies Array if the movie is not already stored, 
   * @param {id_movie:number} unique identification for the movie in the data base,  
   * @return {:void} */
	getMovieDetail(id_movie:string):void{
		this.numberOfSelectedMovies +=1;
		let auxIds = this.idsSelectedMovies.length;
		this.idsSelectedMovies.push(id_movie);
		this.idsSelectedMovies = this.idsSelectedMovies.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
		let auxNewIds = this.idsSelectedMovies.length;
		if(auxIds != auxNewIds){
			this.tmdbapiservice.getMovieDetailRecommend(id_movie).subscribe(data => this.selectedMovies.push(data));
		}
		let searchInput = <HTMLInputElement> document.getElementById('search-box-recommend');
		searchInput.value = '';
		this.ngOnInit();
	}

	/**Show the panel with the results of the algorithm
   * @return {:void} */	
	showRecommendMovies():void{
		var recommendPanel = document.getElementById('recommend-movies-panel');
        recommendPanel.style.display='block';

	}

	/**Close the panel with the results of the algorithm and clear the data
   * @return {:void} */	
	closeRecommendMovies():void{
		var recommendPanel = document.getElementById('recommend-movies-panel');
        recommendPanel.style.display='none';
        this.clearData();

	}

	/**Clear the data used by the algorithm
   * @return {:void} */
	clearData():void{
		this.dataSet =  [];
		this.minSupport = 0;
		this.itemSetsCollectionTables= [];
		this.numberOfSelectedMovies = 0;
		this.selectedMovies = [];
		this.idsSelectedMovies = [];
		this.RecommendedMovies = [];
	}

	/**Set ids of selectedMovies to dataSet and calculate the min support
   * @return {:void} */
	setIdsSimilarMovies():void{
		let length = this.selectedMovies.length;
		if(length ==2 || length==3){
			this.minSupport = 2;
		}else{
			this.minSupport = length%2 == 0 ? length/2 :Math.floor(length/2);
		}
		console.log("Min support: "+this.minSupport);
		console.log("Data target a ser usada por el algoritmo de mineria");
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
		if(this.selectedMovies.length>=2){
			console.log("================  ITERATCION # 1  ================");
			this.setIdsSimilarMovies();

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
			auxKeysItemSet.sort(function(a, b){ return a-b});
			console.log("Etiquetas de itemsets");
			console.log(auxKeysItemSet);
			//CREAR EL PRIMER ITEM SET PARA CONTEO
			for (var i = 0; i < auxKeysItemSet.length;  i++) {
				itemSetSup[auxKeysItemSet[i]]=0;
			}
			//HACER EL CONTEO DE OCURRENCIAS
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

			console.log("Itemsets de esta iteracion: ");
			console.log(itemSetSup);
			for (var i = 0; i < itemSetLength; i++) {
				if(itemSetSup[itemSetkeys[i]] < this.minSupport){delete itemSetSup[itemSetkeys[i]]}	
			}
			//HACER LAS COMBINACIONES DE LOS QUE PASARON EL MIN SUPPORT
			console.log("Itemsets que pasaron el min support: ");
			console.log(itemSetSup);
			this.itemSetsCollectionTables.push(itemSetSup);
			let iterationNumber = 1;
			itemSetkeys = Object.keys( itemSetSup );
			itemSetLength = itemSetkeys.length;
			
			
			// ITERACIONES DEL ALGORITMO
			while(iterationNumber<4 && itemSetLength>1){

				
				iterationNumber++;
				console.log("================  ITERATCION # "+iterationNumber+"  ================");
				itemSetSup = {};
				for (var i = 0; i < itemSetkeys.length; i++) {
					let auxItemsetString = new Array();
					for (var j = i; j < itemSetkeys.length; j++) {
						if(itemSetkeys[j+1]){
						 	auxItemsetString = itemSetkeys[i].split("-").concat(itemSetkeys[j+1].split("-"));
						 	auxItemsetString = auxItemsetString.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
						}
						let key = '';
					 	if(auxItemsetString.length <= iterationNumber && auxItemsetString.length > 0){
					 		let auxItemsetNumber = auxItemsetString.map(function(a){return parseInt(a)});
					 		auxItemsetNumber = auxItemsetNumber.sort(function(a, b){ return a-b});
					 		key = auxItemsetNumber.join("-");
					 		itemSetSup[key] = 0;
					 	}
					}
				}

				console.log("Itemsets de esta iteracion:");
				console.log(itemSetSup);

				itemSetkeys = Object.keys( itemSetSup );
				for (var i = 0; i <itemSetkeys.length ; i++) {
					itemSetSup[itemSetkeys[i]] = this.countItemSets(itemSetkeys[i].split("-"));
				 }

				console.log("Conteo de ocurrencias de los itemsets: ");
				console.log(itemSetSup);
				
				itemSetLength = itemSetkeys.length;

				for (var i = 0; i < itemSetLength; i++) {
					if(itemSetSup[itemSetkeys[i]] < this.minSupport){delete itemSetSup[itemSetkeys[i]]}	
				}

				itemSetkeys = Object.keys( itemSetSup );
				itemSetLength = itemSetkeys.length;

				console.log("Itemsets que pasaron el min support: ");
				console.log(itemSetSup);
				console.log("Cantidad de etiquetas:"+itemSetLength);

				this.itemSetsCollectionTables.push(itemSetSup);
			}
			this.getRecommendedMovies();
		}
	}

	/**Get info of the movies that the algorithm recommended
   * @return {:void} */
	getRecommendedMovies():void{
		let lastIteration = Object.keys(this.itemSetsCollectionTables.pop());
		console.log(lastIteration);
		let result = new Array();
		for (var i = 0; i < lastIteration.length ; i++) {
			result = result.concat(lastIteration[i].split("-"));
		}
		result = result.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
		console.log(result);
		console.log(this.idsSelectedMovies);
		let lengthResults = result.length;
		for (var i = 0; i < lengthResults; i++) {
			this.tmdbapiservice.getMovieDetailRecommend(result[i]).subscribe(data => this.RecommendedMovies.push(data));	
		}
		this.showRecommendMovies();
	}

	/**Calculate the first permutation of the movie ids selected
   * @param {movieIds:Array<any>} array with the movie ids
   * @return {:Array<any>} return an array with the permutations*/
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

	/**Return the total number of occurrences of the itemset in the dataset
   * @param {perm:Array<any>} array with the itemsets
   * @return {:Array<any>} return an array with the permutations*/
	countItemSets(perm:Array<string>):number{
		let length = this.dataSet.length;
		let result = 0;
		for (var i =0; i < length; i++) {
			result += this.countItemSet(this.dataSet[i], perm);			
		}
		return result;
		
	}


	/**Count the number of occurrences of the itemset in the dataSet
   * @param {data:Array<any>} Similar movies  associated to de i selected movie
   * @param {items:Array<any>} array with the itemsets
   * @return {:Array<any>} Return the number of occurrences of the itemset in the dataSet[i]  */
	countItemSet(data:Array<number>, items:Array<string>):number{
		let itemLength = items.length;
		let dataLength = data.length;
		let flag = 0;
		for (var i = 0; i < itemLength; i++) {
			for (var j = 0; j < dataLength; j++) {
				if(data[j]+"" == items[i]){
					flag++;
				}
			}
		}
		return flag == itemLength ?  1 : 0;
	}


}