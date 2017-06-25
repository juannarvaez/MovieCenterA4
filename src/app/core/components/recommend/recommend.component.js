"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var RecommendComponent = (function () {
    function RecommendComponent() {
        this.dataSet = [
            [1, 234, 345, 45, 6, 22, 4, 5662, 23, 3, 2],
            [223, 4, 44, 45, 1, 22, 566, 123, 3, 2],
            [1, 233, 234, 44, 45, 6, 432, 78, 0],
            [2, 1],
            [1223, 33, 4, 33, 1, 6, 22, 5662]
        ];
        this.minSupport = 3;
        this.itemSetsCollectionTables = new Array();
    }
    RecommendComponent.prototype.ngOnInit = function () {
        //PREPARACION DATOS PARA REALIZAR ALGORITMO
    };
    RecommendComponent.prototype.associationAlgorithm = function () {
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
        this.itemSetsCollectionTables.push(itemSetSup);
        //HACER LAS COMBINACIONES DE LOS QUE PASARON EL MIN SUPPORT
        console.log("Itemsets que pasaron el min support ");
        console.log(itemSetSup);
        var iterationNumber = 1;
        // ITERACIONES DEL ALGORITMO
        while (itemSetLength > 1) {
            iterationNumber++;
            console.log("================  ITERACION #" + iterationNumber + "  ================");
            itemSetkeys = Object.keys(itemSetSup);
            itemSetSup = {};
            for (var i = 0; i < itemSetkeys.length; i++) {
                for (var j = i; j < itemSetkeys.length; j++) {
                    if (itemSetkeys[j + 1]) {
                        var key = '';
                        var auxItemsetString = itemSetkeys[i].split("-").concat(itemSetkeys[j + 1].split("-"));
                        auxItemsetString = auxItemsetString.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0; });
                        if (auxItemsetString.length <= iterationNumber) {
                            var auxItemsetNumber = auxItemsetString.map(function (a) { return parseInt(a); });
                            auxItemsetNumber.sort(function (a, b) { return a - b; });
                            key = auxItemsetString.join("-");
                            itemSetSup[key] = 0;
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
            console.log("Itemsets que pasaron el min support: " + this.minSupport);
            console.log(itemSetSup);
        }
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
        providers: [tmdb_api_service_1.TMDBAPIService]
    })
], RecommendComponent);
exports.RecommendComponent = RecommendComponent;
//# sourceMappingURL=recommend.component.js.map