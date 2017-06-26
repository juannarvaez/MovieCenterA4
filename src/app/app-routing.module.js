"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var movie_component_1 = require("./core/components/movie/movie.component");
var home_component_1 = require("./core/components/home/home.component");
var person_component_1 = require("./core/components/person/person.component");
var people_component_1 = require("./core/components/people/people.component");
var recommend_component_1 = require("./core/components/recommend/recommend.component");
var aboutme_component_1 = require("./core/components/aboutme/aboutme.component");
var routes = [
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'movies', component: home_component_1.HomeComponent },
    { path: 'people', component: people_component_1.PeopleComponent },
    { path: 'recommend', component: recommend_component_1.RecommendComponent },
    { path: 'movie/:id', component: movie_component_1.MovieComponent },
    { path: 'person/:id', component: person_component_1.PersonComponent },
    { path: 'aboutme', component: aboutme_component_1.AboutmeComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map