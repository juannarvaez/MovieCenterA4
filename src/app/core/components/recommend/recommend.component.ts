import { Component, OnInit } from '@angular/core';
import { RouterModule, Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {TMDBAPIService} from '../../services/tmdb/tmdb-api.service'

@Component({
	selector: 'recommend',
	templateUrl: './recommend.component.html',
	styleUrls: [],
	providers: [TMDBAPIService]
})

export class  RecommendComponent implements OnInit{
	
	private dataSet = [
		[1,234,345,45,6,22,4,5662,23,3,2],
		[223,4,44,45,1,22,566,123,3,2],
		[1,233,234,44,45,6,432,78,0],
		[2,1],
		[1223,33,4,33,1,6,22,5662]
	];
	private minSupport = 3;

	private itemSetsCollectionTables= new Array();

	ngOnInit():void{

		//PREPARACION DATOS PARA REALIZAR ALGORITMO
		
		
		
	}

	associationAlgorithm():void{
		
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

		this.itemSetsCollectionTables.push(itemSetSup);

		//HACER LAS COMBINACIONES DE LOS QUE PASARON EL MIN SUPPORT
		console.log("Itemsets que pasaron el min support ");
		console.log(itemSetSup);

		let iterationNumber = 1;



		// ITERACIONES DEL ALGORITMO
		


		while(itemSetLength>1){

			
			iterationNumber++;
			console.log("================  ITERACION #"+iterationNumber+"  ================");

			itemSetkeys = Object.keys( itemSetSup );
			itemSetSup = {};


			for (var i = 0; i < itemSetkeys.length; i++) {
				for (var j = i; j < itemSetkeys.length; j++) {
					if(itemSetkeys[j+1]){
						let key = '';
					 	let auxItemsetString = itemSetkeys[i].split("-").concat(itemSetkeys[j+1].split("-"));
					 	auxItemsetString = auxItemsetString.filter(function(a,b,c){return c.indexOf(a,b+1)<0;});
					 	

					 	if(auxItemsetString.length <= iterationNumber){
					 		let auxItemsetNumber = auxItemsetString.map(function(a){return parseInt(a)});
					 		auxItemsetNumber.sort(function(a, b){ return a-b});
					 		key = auxItemsetString.join("-");
					 		itemSetSup[key] = 0;
					 		// console.log(key);
					 	}
					 	
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


		}
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