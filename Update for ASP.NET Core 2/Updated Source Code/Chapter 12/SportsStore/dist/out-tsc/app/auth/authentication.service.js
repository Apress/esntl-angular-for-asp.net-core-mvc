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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var repository_1 = require("../models/repository");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
require("rxjs/add/observable/of");
var AuthenticationService = (function () {
    function AuthenticationService(repo, router) {
        this.repo = repo;
        this.router = router;
        this.authenticated = false;
    }
    AuthenticationService.prototype.login = function () {
        var _this = this;
        this.authenticated = false;
        return this.repo.login(this.name, this.password)
            .map(function (response) {
            if (response.ok) {
                _this.authenticated = true;
                _this.password = null;
                _this.router.navigateByUrl(_this.callbackUrl || "/admin/overview");
            }
            return _this.authenticated;
        })
            .catch(function (e) {
            _this.authenticated = false;
            return Observable_1.Observable.of(false);
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.authenticated = false;
        this.repo.logout();
        this.router.navigateByUrl("/login");
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [repository_1.Repository,
        router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map