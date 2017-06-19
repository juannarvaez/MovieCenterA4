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
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var MovieComponent = (function () {
    function MovieComponent(tmdbapiservice, route, location) {
        this.tmdbapiservice = tmdbapiservice;
        this.route = route;
        this.location = location;
        this.apiYoutube = 'https://www.youtube.com/embed/';
        this.view = {
            movie: {},
            images: 'https://image.tmdb.org/t/p/w500'
        };
    }
    MovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.tmdbapiservice.getMovieDetail(String(+params['id'])); })
            .subscribe(function (response) { return _this.view.movie = response; });
    };
    MovieComponent.prototype.getTrailer = function () {
        var trailer = '';
        var index = this.view.movie.videos.results.length;
        var results = this.view.movie.videos.results;
        for (var i = 0; i < index; i++) {
            if (results[i].type == "Trailer") {
                trailer = this.apiYoutube + results[i].key;
                break;
            }
        }
        return trailer;
    };
    MovieComponent.prototype.movieSlider = function (direction) {
        var limit = $('.form_container .slide').length;
        pointer = (direction == 'right') ? pointer + 1 : pointer - 1;
        pointer = (direction >= limit) ? 0 : pointer;
        pointer = (direction < 0) ? limit - 1 : pointer;
        var mensaje = -(pointer * $('.form_container .slide').width()) + "px";
        console.log(mensaje);
        $('.form_container .slide_container').animate({
            'margin-left': -(pointer * $('.form_container .slide').width()) + "px"
        });
    };
    return MovieComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MovieComponent.prototype, "view", void 0);
MovieComponent = __decorate([
    core_1.Component({
        selector: 'movie',
        templateUrl: './movie.component.html',
        styleUrls: [],
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService,
        router_1.ActivatedRoute,
        common_1.Location])
], MovieComponent);
exports.MovieComponent = MovieComponent;
//# sourceMappingURL=movie.component.js.map