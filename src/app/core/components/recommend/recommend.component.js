"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var search_service_1 = require("../../services/search/search.service");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var RecommendComponent = (function () {
    function RecommendComponent(tmdbapiservice, searchService, router) {
        this.tmdbapiservice = tmdbapiservice;
        this.searchService = searchService;
        this.router = router;
        this.dataSet = new Array();
        // [
        // 	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,40],
        // 	[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,13,14,15,16,17,18],
        // 	[34,35,36,37,38,39,6,7,8,9,10,11,12,13,46,47,48,49,50,51,52,53,],
        // 	[2,1,12,13,14,15,16,17,6,7,8,9,25,26,27,28,50,51,52,53,54,55,56,57,],
        // 	[1223,33,4,33,1,6,22,56621,2,3,4,5,6,7,8,9,10,]
        // ];
        this.minSupport = 0;
        this.itemSetsCollectionTables = new Array();
        this.numberOfSelectedMovies = 0;
        this.searchMovieTerms = new Subject_1.Subject(); //es un observable, ante cambios en su definicion hay repuesta
        this.searchPersonTerms = new Subject_1.Subject();
        this.selectedMovies = new Array();
        this.idsSelectedMovies = new Array();
        this.view = {
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    RecommendComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resultsMovies = this.searchMovieTerms
            .debounceTime(300) //Espere 300 ms después de cada pulsación antes de considerar el término    
            .distinctUntilChanged() //No volver a consultar si no hay cambios en la consulta
            .switchMap(function (term) { return _this.test(term, '/movie'); }) //term es la respuesta de lo archivado en serchTerms
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]); //en caso de error para debugea
        });
    };
    RecommendComponent.prototype.searchTerm = function (term) {
        this.searchMovieTerms.next(term);
        // console.log("Observable");
        // console.log(term);
    };
    RecommendComponent.prototype.test = function (term, specificSearch) {
        if (specificSearch === void 0) { specificSearch = ""; }
        console.log("En el switchMap service response");
        //console.log(this.searchService.search(term));
        return term
            ? this.searchService.search(term, specificSearch)
            : Observable_1.Observable.of([]);
    };
    RecommendComponent.prototype.getMovieDetail = function (id_movie) {
        var _this = this;
        this.numberOfSelectedMovies += 1;
        var auxIds = this.idsSelectedMovies.length;
        this.idsSelectedMovies.push(id_movie);
        this.idsSelectedMovies = this.idsSelectedMovies.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0; });
        var auxNewIds = this.idsSelectedMovies.length;
        if (auxIds != auxNewIds) {
            this.tmdbapiservice.getMovieDetailRecommend(id_movie).subscribe(function (data) { return _this.selectedMovies.push(data); });
        }
        var searchInput = document.getElementById('search-box-recommend');
        searchInput.value = '';
        this.ngOnInit();
    };
    RecommendComponent.prototype.setIdsSimilarMovies = function () {
        var length = this.selectedMovies.length;
        this.minSupport = length % 2 == 0 ? length / 2 : Math.ceil(length / 2);
        if (this.minSupport == 1 && length == 2) {
            this.minSupport = 2;
        }
        console.log(this.minSupport);
        for (var i = 0; i < length; i++) {
            var similarMoviesId = new Array();
            var auxLength = this.selectedMovies[i]["similar"]["results"].length;
            console.log(this.selectedMovies[i]["similar"]["results"]);
            for (var j = 0; j < auxLength; j++) {
                similarMoviesId.push(this.selectedMovies[i]["similar"]["results"][j]["id"]);
            }
            console.log(similarMoviesId);
            this.dataSet.push(similarMoviesId);
        }
    };
    RecommendComponent.prototype.associationAlgorithm = function () {
        // this.setIdsSimilarMovies();
        if (this.selectedMovies.length > 1) {
            var dataSetLength = this.dataSet.length;
            var auxKeysItemSet = new Array();
            var itemSetSup = {};
            // AGRUPAR TODOS LOS RESULTADOS PARA VER LAS KEYS INVOLUCRADAS
            for (var i = 0; i < dataSetLength; i++) {
                auxKeysItemSet = auxKeysItemSet.concat(this.dataSet[i]);
            }
            // FILTRAR LAS KEYS PARA QUE NO SE REPITAN Y ASI PODER HACER EL CONTEO EN LA TABLA HASH
            // unique filter a=elemente b=index c=array
            auxKeysItemSet = auxKeysItemSet.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0; });
            //ORDENAR LAS KEYS
            // console.log(auxKeysItemSet);
            auxKeysItemSet.sort(function (a, b) { return a - b; });
            console.log("Etiquetas de itemsets");
            console.log(auxKeysItemSet);
            //CREAR EL PRIMER ITEM SET PARA CONTEO
            // console.log(auxKeysItemSet);
            for (var i = 0; i < auxKeysItemSet.length; i++) {
                // console.log(auxKeysItemSet[i]);
                itemSetSup[auxKeysItemSet[i]] = 0;
            }
            //HACER EL CONTEO
            for (var i = 0; i < dataSetLength; i++) {
                var auxLength = this.dataSet[i].length;
                var data = this.dataSet[i];
                for (var j = 0; j < auxLength; j++) {
                    itemSetSup[data[j]] += 1;
                }
            }
            //ELIMINAR LO QUE NO CUMPLE CON EL MIN SUPPORT ITEMSET
            var itemSetkeys = Object.keys(itemSetSup);
            var itemSetLength = itemSetkeys.length;
            console.log("Hash con conteo itemset sup ");
            console.log(itemSetSup);
            for (var i = 0; i < itemSetLength; i++) {
                if (itemSetSup[itemSetkeys[i]] < this.minSupport) {
                    delete itemSetSup[itemSetkeys[i]];
                }
            }
            //HACER LAS COMBINACIONES DE LOS QUE PASARON EL MIN SUPPORT
            console.log("Itemsets que pasaron el min support ");
            console.log(itemSetSup);
            this.itemSetsCollectionTables.push(itemSetSup);
            var iterationNumber = 1;
            itemSetkeys = Object.keys(itemSetSup);
            itemSetLength = itemSetkeys.length;
            // ITERACIONES DEL ALGORITMO
            console.log("keys iteracion 1:" + itemSetLength);
            while (iterationNumber < 4 && itemSetLength > 1) {
                // while(false ){
                // while(itemSetkeys.length>2 ){
                iterationNumber++;
                console.log("================  ITERACION # " + iterationNumber + "  ================");
                //itemSetkeys = Object.keys( itemSetSup );
                // console.log(itemSetkeys);
                itemSetSup = {};
                for (var i = 0; i < itemSetkeys.length; i++) {
                    var auxItemsetString = new Array();
                    for (var j = i; j < itemSetkeys.length; j++) {
                        if (itemSetkeys[j + 1]) {
                            // console.log("========================");
                            // console.log("en el concat");
                            // console.log( itemSetkeys[i].split("-"));
                            // console.log( itemSetkeys[j+1].split("-"));
                            // console.log("========================");
                            auxItemsetString = itemSetkeys[i].split("-").concat(itemSetkeys[j + 1].split("-"));
                            auxItemsetString = auxItemsetString.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0; });
                        }
                        var key = '';
                        if (auxItemsetString.length <= iterationNumber && auxItemsetString.length > 0) {
                            // console.log("Desordenado ");
                            // console.log(auxItemsetString);
                            var auxItemsetNumber = auxItemsetString.map(function (a) { return parseInt(a); });
                            auxItemsetNumber = auxItemsetNumber.sort(function (a, b) { return a - b; });
                            // console.log("Ordenado ");
                            // console.log(auxItemsetNumber);
                            key = auxItemsetNumber.join("-");
                            itemSetSup[key] = 0;
                        }
                    }
                }
                //==
                // let perms = this.firstEspecialPermutation(itemSetkeys);
                console.log("Permutaciones (itemsets):");
                console.log(itemSetSup);
                // perms = Object.keys(itemSetSup);
                // itemSetSup={};
                itemSetkeys = Object.keys(itemSetSup);
                for (var i = 0; i < itemSetkeys.length; i++) {
                    // console.log("paso 1");
                    itemSetSup[itemSetkeys[i]] = this.countItemSets(itemSetkeys[i].split("-"));
                }
                console.log("Conteo de ocurrencias de los itemsets: ");
                console.log(itemSetSup);
                itemSetLength = itemSetkeys.length;
                for (var i = 0; i < itemSetLength; i++) {
                    if (itemSetSup[itemSetkeys[i]] < this.minSupport) {
                        delete itemSetSup[itemSetkeys[i]];
                    }
                }
                itemSetkeys = Object.keys(itemSetSup);
                itemSetLength = itemSetkeys.length;
                console.log("Itemsets que pasaron el min support: " + this.minSupport);
                console.log(itemSetSup);
                console.log("Cantidad de etiquetas:" + itemSetLength);
                this.itemSetsCollectionTables.push(itemSetSup);
            }
        }
        // for (var i = 0; i < this.itemSetsCollectionTables.length; i++) {
        // 	console.log(this.itemSetsCollectionTables[i]);	
        // }
        var lastIteration = Object.keys(this.itemSetsCollectionTables.pop());
        console.log(lastIteration);
        var result = new Array();
        for (var i = 0; i < lastIteration.length; i++) {
            result = result.concat(lastIteration[i].split("-"));
        }
        result = result.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0; });
        console.log(result);
        console.log(this.idsSelectedMovies);
    };
    RecommendComponent.prototype.firstEspecialPermutation = function (movieIds) {
        var results = new Array();
        var length = movieIds.length;
        for (var i = 0; i < length; i++) {
            for (var j = i; j < length; j++) {
                if (movieIds[j + 1]) {
                    results.push(movieIds[i] + "-" + movieIds[j + 1]);
                }
                else {
                    break;
                }
            }
        }
        return results;
    };
    RecommendComponent.prototype.countItemSets = function (perm) {
        // console.log("paso 2");
        var length = this.dataSet.length;
        var result = 0;
        for (var i = 0; i < length; i++) {
            // console.log("paso 3");
            result += this.countItemSet(this.dataSet[i], perm);
        }
        return result;
    };
    RecommendComponent.prototype.countItemSet = function (data, items) {
        // console.log("paso 4");
        var itemLength = items.length;
        // console.log("paso 4.1");
        var dataLength = data.length;
        // console.log("paso 4.2");
        var flag = 0;
        for (var i = 0; i < itemLength; i++) {
            // console.log("paso 5");
            for (var j = 0; j < dataLength; j++) {
                // console.log("paso 6");
                if (data[j] + "" == items[i]) {
                    flag++;
                }
            }
        }
        // console.log("flag: "+flag);
        return flag == itemLength ? 1 : 0;
    };
    return RecommendComponent;
}());
RecommendComponent = __decorate([
    core_1.Component({
        selector: 'recommend',
        templateUrl: './recommend.component.html',
        styleUrls: [],
        providers: [search_service_1.SearchService, tmdb_api_service_1.TMDBAPIService]
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService,
        search_service_1.SearchService,
        router_1.Router])
], RecommendComponent);
exports.RecommendComponent = RecommendComponent;
//# sourceMappingURL=recommend.component.js.map