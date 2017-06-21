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
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
        this.baseUrl = "https://api.themoviedb.org/3/search";
        this.apiKey = "6dc0d2605088c01254ffedbd444bc2e4";
    }
    SearchService.prototype.search = function (query) {
        var specificUrl = '/person';
        var url = this.baseUrl + specificUrl + "?api_key=" + this.apiKey + "&query=" + query;
        // url = 'https://api.themoviedb.org/3/search/movie?api_key=6dc0d2605088c01254ffedbd444bc2e4&query=wonder%20woman';
        return this.http
            .get(url)
            .map(function (response) { return response.json().results; });
    };
    return SearchService;
}());
SearchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map