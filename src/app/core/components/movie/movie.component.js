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
    function MovieComponent(tmdbapiservice, route, location, router) {
        this.tmdbapiservice = tmdbapiservice;
        this.route = route;
        this.location = location;
        this.router = router;
        this.apiYoutube = 'https://www.youtube.com/embed/';
        this.pointer = 0; //slider var
        this.view = {
            movie: {
                videos: { results: [{ type: '', key: '' }] },
                credits: { cast: [{ id: '', profile_path: '' }] },
            },
            actor: { id: '', profile_path: '' },
            images: 'https://image.tmdb.org/t/p/w500'
        };
    }
    /**Loads movie information
  * @return {:void} */
    MovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.tmdbapiservice.getMovieDetail(String(+params['id'])); })
            .subscribe(function (response) { return _this.view.movie = response; });
    };
    /**Search the trailer from the videos results and returns the key
   * @return {:string} youtube url of trailer video for this movie*/
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
    /**Redirects to a movie detail selected from slider
   * @param {id_movie:number} unique identification for the movie in the data base,
   * @return {:void} */
    MovieComponent.prototype.goMovieDetail = function (id_movie) {
        window.scrollTo(0, 0);
        this.router.navigate(['movie', String(id_movie)]);
    };
    /**Redirects to people detail information panel, by using Go to detail button
   * @return {:void} */
    MovieComponent.prototype.goPersonDetail = function (id_person) {
        this.router.navigate(['person', String(id_person)]);
    };
    /**Search and shows the actor information on the actor panel
   * @param {id_actor:string} unique identification for the person in the data base,
   * en el componente siguiente
   * @return {:void} */
    MovieComponent.prototype.showActor = function (id_actor) {
        var _this = this;
        this.tmdbapiservice.getDetailPerson(id_actor).subscribe(function (response) { return _this.actorInfo = response; });
        for (var i in this.view.movie.credits.cast) {
            if (this.view.movie.credits.cast[i].id == id_actor) {
                this.view.actor = this.view.movie.credits.cast[i];
                console.log(this.view.actor);
                break;
            }
        }
        var actorPanel = document.getElementById('actorDetailPanel');
        var actorPanelPicture = document.getElementById('actorDetailPanelPicture');
        actorPanel.style.display = 'block';
        actorPanelPicture.style.backgroundRepeat = 'no-repeat';
        actorPanelPicture.style.backgroundImage = "url(" + this.view.images + this.view.actor.profile_path + ")";
    };
    /**Close actor panel
   * @return {:void} */
    MovieComponent.prototype.closeActorDetail = function () {
        document.getElementById("actorDetailPanel").style.display = 'none';
    };
    /**Slider javascript logic to see similar movies on the movie detail panel
   * @param {direction:string} Indicates the move direction
   * en el componente siguiente
   * @return {:void} */
    MovieComponent.prototype.movieSlider = function (direction) {
        var slide = document.getElementsByClassName('slide');
        var limit = slide.length;
        var div_width = parseInt(slide[0].clientWidth) + 8;
        this.pointer = (direction == 'right') ? this.pointer + 1 : this.pointer - 1;
        var slide_container = document.getElementById('slide_container');
        var move_left = -1 * this.pointer * div_width;
        slide_container.style.marginLeft = move_left + 'px';
        slide_container.style.color = 'red';
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
        styleUrls: ['./movie.component.css'],
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService,
        router_1.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], MovieComponent);
exports.MovieComponent = MovieComponent;
//# sourceMappingURL=movie.component.js.map