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
var repository_1 = require("./repository");
var Cart = (function () {
    function Cart(repo) {
        var _this = this;
        this.repo = repo;
        this.selections = [];
        this.itemCount = 0;
        this.totalPrice = 0;
        repo.getSessionData("cart").subscribe(function (cartData) {
            if (cartData != null) {
                cartData.map(function (item) { return new ProductSelection(_this, item.productId, item.name, item.price, item.quantity); })
                    .forEach(function (item) { return _this.selections.push(item); });
                _this.update(false);
            }
        });
    }
    Cart.prototype.addProduct = function (product) {
        var selection = this.selections
            .find(function (ps) { return ps.productId == product.productId; });
        if (selection) {
            selection.quantity++;
        }
        else {
            this.selections.push(new ProductSelection(this, product.productId, product.name, product.price, 1));
        }
        this.update();
    };
    Cart.prototype.updateQuantity = function (productId, quantity) {
        if (quantity > 0) {
            var selection = this.selections.find(function (ps) { return ps.productId == productId; });
            if (selection) {
                selection.quantity = quantity;
            }
        }
        else {
            var index = this.selections.findIndex(function (ps) { return ps.productId == productId; });
            if (index != -1) {
                this.selections.splice(index, 1);
            }
            this.update();
        }
    };
    Cart.prototype.clear = function () {
        this.selections = [];
        this.update();
    };
    Cart.prototype.update = function (storeData) {
        if (storeData === void 0) { storeData = true; }
        this.itemCount = this.selections.map(function (ps) { return ps.quantity; })
            .reduce(function (prev, curr) { return prev + curr; }, 0);
        this.totalPrice = this.selections.map(function (ps) { return ps.price * ps.quantity; })
            .reduce(function (prev, curr) { return prev + curr; }, 0);
        if (storeData) {
            this.repo.storeSessionData("cart", this.selections.map(function (s) {
                return {
                    productId: s.productId, name: s.name,
                    price: s.price, quantity: s.quantity
                };
            }));
        }
    };
    return Cart;
}());
Cart = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [repository_1.Repository])
], Cart);
exports.Cart = Cart;
var ProductSelection = (function () {
    function ProductSelection(cart, productId, name, price, quantityValue) {
        this.cart = cart;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantityValue = quantityValue;
    }
    Object.defineProperty(ProductSelection.prototype, "quantity", {
        get: function () {
            return this.quantityValue;
        },
        set: function (newQuantity) {
            this.quantityValue = newQuantity;
            this.cart.update();
        },
        enumerable: true,
        configurable: true
    });
    return ProductSelection;
}());
exports.ProductSelection = ProductSelection;
//# sourceMappingURL=cart.model.js.map