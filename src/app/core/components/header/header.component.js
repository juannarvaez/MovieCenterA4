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
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var search_service_1 = require("../../services/search/search.service");
var HeaderComponent = (function () {
    function HeaderComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.searchMovieTerms = new Subject_1.Subject(); //Observable, There is an answer if there are changes in these variables
        this.searchPersonTerms = new Subject_1.Subject(); //Observable
        this.pointer = -1;
        this.location = 'MOVIES';
        this.view = {
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resultsMovies = this.searchMovieTerms
            .debounceTime(300) //Wait 300 ms after search the term    
            .distinctUntilChanged() //If there are no changes, dont do the request
            .switchMap(function (term) { return _this.test(term, '/movie'); }) //Request and stored of the response
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
        this.resultsPersons = this.searchPersonTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.test(term, '/person'); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    /**Add word typed by user to searchMovieTerms and searchPersonTerms observables
   * @param {term:string} Word typed by user
   * @return {:void} */
    HeaderComponent.prototype.searchTerm = function (term) {
        this.searchMovieTerms.next(term);
        this.searchPersonTerms.next(term);
    };
    /**Do the request to the service
   * @param {term:string} Word stored on  searchMovieTerms or searchPersonTerms observable
   * @return {:void} */
    HeaderComponent.prototype.test = function (term, specificSearch) {
        if (specificSearch === void 0) { specificSearch = ""; }
        return term ? this.searchService.search(term, specificSearch) : Observable_1.Observable.of([]);
    };
    /**Redirects to home
   * @return {:void} */
    HeaderComponent.prototype.goHome = function () {
        this.location = 'HOME';
        this.pointer = -1;
        this.router.navigate(['home']);
    };
    /**Redirects to movies section
   * @return {:void} */
    HeaderComponent.prototype.goMovies = function () {
        this.location = 'MOVIES';
        this.menuAnimation(-1);
        this.router.navigate(['movies']);
    };
    /**Redirects to a movie detail searched and selected in the search box
   * @param {id_movie:number} unique identification for the movie in the data base,
   * @return {:void} */
    HeaderComponent.prototype.goMovieDetail = function (id_movie) {
        this.location = 'MOVIE DETAIL';
        this.router.navigate(['movie', String(id_movie)]);
        this.ngOnInit();
        var searchInput = document.getElementById('search-box');
        searchInput.value = '';
    };
    /**Redirects to people section
   * @return {:void} */
    HeaderComponent.prototype.goPeople = function () {
        this.location = 'PEOPLE';
        this.menuAnimation(-1);
        this.router.navigate(['people']);
    };
    /**Redirects to a person detail searched and selected in the search box
   * @param {id_person:number} unique identification for the person in the data base,
   * @return {:void} */
    HeaderComponent.prototype.goPersonDetail = function (id_person) {
        this.location = 'PERSON DETAIL';
        this.router.navigate(['person', String(id_person)]);
        this.ngOnInit();
        var searchInput = document.getElementById('search-box');
        searchInput.value = '';
    };
    /**Redirects to Recommend me a movie section
   * @return {:void} */
    HeaderComponent.prototype.goRecommend = function () {
        this.location = 'RECOMMEND ME A MOVIE';
        this.menuAnimation(-1);
        this.router.navigate(['recommend']);
    };
    /**This method do the animation of menu buttom, it knows what to do by the pointer param
   * @param {pointer:number} when is -1 , menu bar have to be hidden, when is 1, have to be shown
   * @return {:void} */
    HeaderComponent.prototype.menuAnimation = function (pointer) {
        this.pointer = this.pointer * pointer;
        console.log(this.pointer);
        var menuImgButton = document.getElementById('menu-img-button');
        var cancelImgButton = document.getElementById('cancel-img-button');
        var menuBarFormContainer = document.getElementById('form_container_menu');
        var menuBarSlide = document.getElementById('slide_menu');
        var separator = document.getElementById('separator');
        var searchBoxInput = document.getElementById('search-box');
        var locationTag = document.getElementById('location-tag');
        var searchComponent = document.getElementById('search-component');
        if (this.pointer == 1) {
            menuImgButton.style.width = "24px";
            menuImgButton.style.height = "0px";
            menuImgButton.style.top = "-3px";
            menuImgButton.style.opacity = "0";
            menuBarSlide.style.marginLeft = "0%";
            separator.style.opacity = "0";
            searchBoxInput.style.width = "0%";
            searchBoxInput.style.marginLeft = "100%";
            locationTag.style.opacity = "0";
            searchComponent.style.zIndex = "-100";
            cancelImgButton.style.width = "16px";
            cancelImgButton.style.height = "16px";
            cancelImgButton.style.top = "0px";
            cancelImgButton.style.opacity = "1";
        }
        else {
            menuImgButton.style.width = "24px";
            menuImgButton.style.height = "24px";
            menuImgButton.style.top = "0px";
            menuImgButton.style.opacity = "1";
            cancelImgButton.style.width = "16px";
            cancelImgButton.style.height = "0px";
            cancelImgButton.style.top = "-5px";
            cancelImgButton.style.opacity = "0";
            menuBarSlide.style.marginLeft = "-100%";
            separator.style.opacity = "0.3";
            searchBoxInput.style.width = "100%";
            searchBoxInput.style.marginLeft = "0%";
            setTimeout(function () { locationTag.style.opacity = "1"; }, 500);
            searchComponent.style.zIndex = "0";
        }
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css'],
        providers: [search_service_1.SearchService],
    }),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        router_1.Router])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map