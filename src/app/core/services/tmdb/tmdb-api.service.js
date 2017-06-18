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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TMDBAPIService = (function () {
    function TMDBAPIService(http) {
        this.http = http;
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.apiKey = "518d83af872f927b98cfe36a90cd05b0";
        this.language = "en-US";
        this.adult = "false";
    }
    //Abstract funtion to get info in json format from the tmdb api 
    TMDBAPIService.prototype.getFromTMDB = function (search, extra_params) {
        if (extra_params === void 0) { extra_params = ""; }
        var url = this.baseUrl + search + "?api_key=" + this.apiKey + "&language=" + this.language + extra_params;
        return this.http.get(url)
            .map(function (response) {
            return response.json();
        });
    };
    //=========================== MOVIES ===============================
    TMDBAPIService.prototype.getPopularMovies = function () {
        return this.getFromTMDB('movie/popular');
    };
    TMDBAPIService.prototype.getMovieDetail = function (id) {
        return this.getFromTMDB('movie/' + id);
    };
    TMDBAPIService.prototype.getTopMovies = function () {
        return this.getFromTMDB('movie/top_rated');
    };
    TMDBAPIService.prototype.getUpcomingMovies = function () {
        return this.getFromTMDB('movie/now_playing');
    };
    //=========================== PERSONS ==============================
    TMDBAPIService.prototype.getPopularPersons = function () {
        return this.getFromTMDB('person/popular');
    };
    TMDBAPIService.prototype.getDetailPerson = function (id) {
        return this.getFromTMDB('person/' + id);
    };
    TMDBAPIService.prototype.getMovieCreditsPerson = function (id) {
        return this.getFromTMDB('person/' + id + '/movie_credits');
    };
    TMDBAPIService.prototype.searchMovie = function () {
        //var url= 'app/heroes';
        // var url = "http://api.themoviedb.org/3/discover/movie%3Fpage=1&include_adult=false&sort_by=popularity.desc&api_key=802cd9bec58e75474a66bfa717fd1106";
        // var url = "https://api.themoviedb.org/3/movie/popular?api_key=802cd9bec58e75474a66bfa717fd1106";
        // // var url = 'http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo';
        // return this.http.get(url)
        // .map(response => {return response.json()});
        return this.getFromTMDB('movie/popular');
    };
    return TMDBAPIService;
}());
TMDBAPIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TMDBAPIService);
exports.TMDBAPIService = TMDBAPIService;
//# sourceMappingURL=tmdb-api.service.js.map