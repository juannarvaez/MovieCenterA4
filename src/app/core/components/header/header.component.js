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
        this.searchMovieTerms = new Subject_1.Subject(); //es un observable, ante cambios en su definicion hay repuesta
        this.searchPersonTerms = new Subject_1.Subject();
        this.pointer = -1;
        this.view = {
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resultsMovies = this.searchMovieTerms
            .debounceTime(300) //Espere 300 ms después de cada pulsación antes de considerar el término    
            .distinctUntilChanged() //No volver a consultar si no hay cambios en la consulta
            .switchMap(function (term) { return _this.test(term, '/movie'); }) //term es la respuesta de lo archivado en serchTerms
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]); //en caso de error para debugea
        });
        this.resultsPersons = this.searchPersonTerms
            .debounceTime(300) //Espere 300 ms después de cada pulsación antes de considerar el término    
            .distinctUntilChanged() //No volver a consultar si no hay cambios en la consulta
            .switchMap(function (term) { return _this.test(term, '/person'); }) //term es la respuesta de lo archivado en serchTerms
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]); //en caso de error para debugea
        });
    };
    HeaderComponent.prototype.searchTerm = function (term) {
        this.searchMovieTerms.next(term);
        this.searchPersonTerms.next(term);
        // console.log("Observable");
        // console.log(term);
    };
    HeaderComponent.prototype.test = function (term, specificSearch) {
        if (specificSearch === void 0) { specificSearch = ""; }
        console.log("En el switchMap service response");
        //console.log(this.searchService.search(term));
        return term
            ? this.searchService.search(term, specificSearch)
            : Observable_1.Observable.of([]);
    };
    HeaderComponent.prototype.goMovies = function () {
        this.menuAnimation(-1);
        this.router.navigate(['home/movies']);
    };
    HeaderComponent.prototype.goMovieDetail = function (id_movie) {
        this.router.navigate(['home/detailMovie', String(id_movie)]);
        this.ngOnInit();
        var searchInput = document.getElementById('search-box');
        searchInput.value = '';
        // this.resultsMovies = Observable.of<any>([]);
        // this.resultsPersons = Observable.of<any>([]);
    };
    HeaderComponent.prototype.goPeople = function () {
        this.menuAnimation(-1);
        this.router.navigate(['home/people']);
    };
    HeaderComponent.prototype.goPersonDetail = function (id_person) {
        this.router.navigate(['home/person', String(id_person)]);
        this.ngOnInit();
        var searchInput = document.getElementById('search-box');
        searchInput.value = '';
        //searchInput.setAttribute('value', '');
        // this.resultsPersons = Observable.of<any>([]);
        // this.resultsMovies = Observable.of<any>([]);
    };
    HeaderComponent.prototype.menuAnimation = function (pointer) {
        this.pointer = this.pointer * pointer;
        console.log(this.pointer);
        var menuImgButton = document.getElementById('menu-img-button');
        var cancelImgButton = document.getElementById('cancel-img-button');
        var menuBarFormContainer = document.getElementById('form_container_menu');
        var menuBarSlide = document.getElementById('slide_menu');
        var separator = document.getElementById('separator');
        // menuImgButton.style.width = "24px";
        // menuImgButton.style.height = "0px"; 
        if (this.pointer == 1) {
            menuImgButton.style.width = "24px";
            menuImgButton.style.height = "0px";
            menuImgButton.style.top = "-3px";
            menuImgButton.style.opacity = "0";
            // menuBarFormContainer.style.width= "400px";
            menuBarSlide.style.marginLeft = "0%";
            separator.style.opacity = "0";
        }
        else {
            menuImgButton.style.width = "24px";
            menuImgButton.style.height = "24px";
            menuImgButton.style.top = "0px";
            menuImgButton.style.opacity = "1";
        }
        if (this.pointer == -1) {
            cancelImgButton.style.width = "16px";
            cancelImgButton.style.height = "0px";
            cancelImgButton.style.top = "-5px";
            cancelImgButton.style.opacity = "0";
            menuBarSlide.style.marginLeft = "-100%";
            separator.style.opacity = "0.3";
        }
        else {
            cancelImgButton.style.width = "16px";
            cancelImgButton.style.height = "16px";
            cancelImgButton.style.top = "0px";
            cancelImgButton.style.opacity = "1";
        }
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