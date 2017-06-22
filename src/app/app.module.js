"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var filter_safe_video_1 = require("./core/filters/safeVideo/filter.safe-video");
var filter_percentage_1 = require("./core/filters/percentage/filter.percentage");
var tmdb_api_service_1 = require("./core/services/tmdb/tmdb-api.service");
var search_service_1 = require("./core/services/search/search.service");
var app_component_1 = require("./app.component");
var home_component_1 = require("./core/components/home/home.component");
var movie_tile_component_1 = require("./core/components/movieTile/movie-tile.component");
var movie_component_1 = require("./core/components/movie/movie.component");
var person_component_1 = require("./core/components/person/person.component");
var footer_component_1 = require("./core/components/footer/footer.component");
var header_component_1 = require("./core/components/header/header.component");
var people_component_1 = require("./core/components/people/people.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            movie_tile_component_1.MovieTileComponent,
            movie_component_1.MovieComponent,
            person_component_1.PersonComponent,
            people_component_1.PeopleComponent,
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            filter_percentage_1.Percentage,
            filter_safe_video_1.SafeVideo
        ],
        providers: [
            tmdb_api_service_1.TMDBAPIService,
            search_service_1.SearchService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map