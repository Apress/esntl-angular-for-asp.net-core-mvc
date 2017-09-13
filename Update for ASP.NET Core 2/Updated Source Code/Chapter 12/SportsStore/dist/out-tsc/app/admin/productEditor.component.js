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
var ProductEditorComponent = (function () {
    function ProductEditorComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(ProductEditorComponent.prototype, "product", {
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditorComponent.prototype, "suppliers", {
        get: function () {
            return this.repo.suppliers;
        },
        enumerable: true,
        configurable: true
    });
    ProductEditorComponent.prototype.compareSuppliers = function (s1, s2) {
        return s1 && s2 && s1.name == s2.name;
    };
    return ProductEditorComponent;
}());
ProductEditorComponent = __decorate([
    core_1.Component({
        selector: "admin-product-editor",
        templateUrl: "productEditor.component.html"
    }),
    __metadata("design:paramtypes", [repository_1.Repository])
], ProductEditorComponent);
exports.ProductEditorComponent = ProductEditorComponent;
//# sourceMappingURL=productEditor.component.js.map