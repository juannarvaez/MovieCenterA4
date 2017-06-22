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
var MovieTileComponent = (function () {
    function MovieTileComponent(router) {
        this.router = router;
        this.view = {
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    MovieTileComponent.prototype.ngOnInit = function () {
        console.log("movie-tile");
        console.log(this.movie);
    };
    MovieTileComponent.prototype.goMovieDetile = function (id_movie) {
        this.router.navigate(['home/detailMovie', String(id_movie)]);
    };
    return MovieTileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MovieTileComponent.prototype, "movie", void 0);
MovieTileComponent = __decorate([
    core_1.Component({
        selector: 'movie-tile',
        templateUrl: './movie-tile.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [router_1.Router])
], MovieTileComponent);
exports.MovieTileComponent = MovieTileComponent;
//# sourceMappingURL=movie-tile.component.js.map