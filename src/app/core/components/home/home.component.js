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
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var HomeComponent = (function () {
    function HomeComponent(tmdbapiservice) {
        this.tmdbapiservice = tmdbapiservice;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.searchMovie = function () {
        console.log("Popular movies: ");
        this.tmdbapiservice.getPopularMovies().subscribe(function (data) { return console.log(data); });
        console.log("Movies detail: ");
        this.tmdbapiservice.getMovieDetail("166426").subscribe(function (data) { return console.log(data); });
        console.log("Top movies: ");
        this.tmdbapiservice.getTopMovies().subscribe(function (data) { return console.log(data); });
        console.log("Up coming movies: ");
        this.tmdbapiservice.getUpcomingMovies().subscribe(function (data) { return console.log(data); });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home-component',
        templateUrl: './home.component.html',
        styleUrls: [],
        providers: [tmdb_api_service_1.TMDBAPIService]
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map