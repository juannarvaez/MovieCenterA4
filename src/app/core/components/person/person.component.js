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
var PersonComponent = (function () {
    function PersonComponent(tmdbapiservice, route, location, router) {
        this.tmdbapiservice = tmdbapiservice;
        this.route = route;
        this.location = location;
        this.router = router;
        this.view = {
            images: 'https://image.tmdb.org/t/p/w500'
        };
    }
    PersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.tmdbapiservice.getDetailPerson(String(+params['id'])); })
            .subscribe(function (response) { return _this.person = response; });
    };
    PersonComponent.prototype.getProfileImage = function () {
        var limit = this.person.images.profiles.length;
        return limit == 1 ?
            this.person.images.profiles[0].file_path :
            this.person.images.profiles[1].file_path;
    };
    PersonComponent.prototype.goMovieDetail = function (id_movie) {
        this.router.navigate(['home/detailMovie', String(id_movie)]);
    };
    PersonComponent.prototype.detail = function () {
        console.log(this.person);
    };
    return PersonComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PersonComponent.prototype, "person", void 0);
PersonComponent = __decorate([
    core_1.Component({
        selector: 'person',
        templateUrl: './person.component.html',
        styleUrls: ['./person.component.css'],
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService,
        router_1.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], PersonComponent);
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map