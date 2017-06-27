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
require("rxjs/add/operator/switchMap");
var tmdb_api_service_1 = require("../../services/tmdb/tmdb-api.service");
var PeopleComponent = (function () {
    function PeopleComponent(tmdbapiservice, router) {
        this.tmdbapiservice = tmdbapiservice;
        this.router = router;
        this.view = {
            people: '',
            images: 'https://image.tmdb.org/t/p/w500',
        };
    }
    PeopleComponent.prototype.ngOnInit = function () {
        this.getPeople();
    };
    /**Get people info and load the data
   * @return {:void} */
    PeopleComponent.prototype.getPeople = function () {
        var _this = this;
        this.tmdbapiservice.getPopularPersons().subscribe(function (data) { return _this.view.people = data; });
    };
    /**Redirects to a person detail
   * @param {id_person:number} unique identification for the person in the data base,
   * @return {:void} */
    PeopleComponent.prototype.goPersonDetail = function (id_person) {
        this.router.navigate(['person', String(id_person)]);
    };
    return PeopleComponent;
}());
PeopleComponent = __decorate([
    core_1.Component({
        selector: 'people',
        templateUrl: './people.component.html',
        styleUrls: ['./people.component.css'],
    }),
    __metadata("design:paramtypes", [tmdb_api_service_1.TMDBAPIService,
        router_1.Router])
], PeopleComponent);
exports.PeopleComponent = PeopleComponent;
//# sourceMappingURL=people.component.js.map