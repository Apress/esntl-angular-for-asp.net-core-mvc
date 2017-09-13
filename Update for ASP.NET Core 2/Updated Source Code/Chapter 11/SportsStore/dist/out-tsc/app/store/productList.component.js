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
var cart_model_1 = require("../models/cart.model");
var ProductListComponent = (function () {
    function ProductListComponent(repo, cart) {
        this.repo = repo;
        this.cart = cart;
    }
    Object.defineProperty(ProductListComponent.prototype, "products", {
        get: function () {
            if (this.repo.products != null && this.repo.products.length > 0) {
                var pageIndex = (this.repo.pagination.currentPage - 1)
                    * this.repo.pagination.productsPerPage;
                return this.repo.products.slice(pageIndex, pageIndex + this.repo.pagination.productsPerPage);
            }
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.addToCart = function (product) {
        this.cart.addProduct(product);
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        selector: "store-product-list",
        templateUrl: "productList.component.html"
    }),
    __metadata("design:paramtypes", [repository_1.Repository, cart_model_1.Cart])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=productList.component.js.map