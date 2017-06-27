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
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var MoviesComponent = (function () {
    function MoviesComponent(tmdbapiservice) {
        this.tmdbapiservice = tmdbapiservice;
        this.view = {
            movies: '',
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    /**Get movies info and load the data
   * @return {:void} */
    MoviesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tmdbapiservice.getPopularMovies().subscribe(function (data) { return _this.view.movies = data; });
    };
    return MoviesComponent;
}());
MoviesComponent = __decorate([
    core_1.Component({
        selector: 'movies-component',
        templateUrl: './movies.component.html',
        styleUrls: ['./movies.component.css'],
        providers: [tmdb_api_service_1.TMDBAPIService]
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService])
], MoviesComponent);
exports.MoviesComponent = MoviesComponent;
//# sourceMappingURL=movies.component.js.map