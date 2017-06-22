"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Percentage = (function () {
    /**Pipe que permite acceder a enlaces que el navegador
        determina como inseguros*/
    function Percentage() {
    }
    Percentage.prototype.transform = function (percentage, limit) {
        return percentage.toString().substring(0, limit) + '%';
    };
    return Percentage;
}());
Percentage = __decorate([
    core_1.Pipe({
        name: 'percentage'
    })
], Percentage);
exports.Percentage = Percentage;
//# sourceMappingURL=filter.percentage.js.map