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
var HeaderComponent = (function () {
    function HeaderComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject(); //es un observable, ante cambios en su definicion hay repuesta
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.results = this.searchTerms
            .debounceTime(300) //Espere 300 ms después de cada pulsación antes de considerar el término    
            .distinctUntilChanged() //No volver a consultar si no hay cambios en la consulta
            .switchMap(function (term) { return _this.test(term); }) //term es la respuesta de lo archivado en serchTerms
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]); //en caso de error para debugea
        });
    };
    HeaderComponent.prototype.searchTerm = function (term) {
        this.searchTerms.next(term);
        console.log(term);
        console.log("Observable");
        console.log(this.searchTerms);
    };
    HeaderComponent.prototype.test = function (term) {
        console.log("En el switchMap");
        console.log(term);
        return term
            ? this.searchService.search(term)
            : Observable_1.Observable.of([]);
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'header',
        templateUrl: './header.component.html',
        styleUrls: [],
        providers: [search_service_1.SearchService],
    }),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        router_1.Router])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map