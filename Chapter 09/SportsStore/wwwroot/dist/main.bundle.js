webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__(109);


var bootApplication = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]);
};
if (true) {
    module["hot"].accept();
    module["hot"].dispose(function () {
        var oldRootElem = document.querySelector("app-root");
        var newRootElem = document.createElement("app-root");
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().destroy();
    });
}
if (document.readyState === "complete") {
    bootApplication();
}
else {
    document.addEventListener("DOMContentLoaded", bootApplication);
}
//# sourceMappingURL=boot.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_product_model__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_supplier_model__ = __webpack_require__(113);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(AppComponent.prototype, "product", {
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.createProduct = function () {
        this.repo.createProduct(new __WEBPACK_IMPORTED_MODULE_2__models_product_model__["a" /* Product */](0, "X-Ray Scuba Mask", "Watersports", "See what the fish are hiding", 49.99, this.repo.products[0].supplier));
    };
    AppComponent.prototype.createProductAndSupplier = function () {
        var s = new __WEBPACK_IMPORTED_MODULE_3__models_supplier_model__["a" /* Supplier */](0, "Rocket Shoe Corp", "Boston", "MA");
        var p = new __WEBPACK_IMPORTED_MODULE_2__models_product_model__["a" /* Product */](0, "Rocket-Powered Shoes", "Running", "Set a new record", 100, s);
        this.repo.createProductAndSupplier(p, s);
    };
    AppComponent.prototype.replaceProduct = function () {
        var p = this.repo.products[0];
        p.name = "Modified Product";
        p.category = "Modified Category";
        this.repo.replaceProduct(p);
    };
    AppComponent.prototype.replaceSupplier = function () {
        var s = new __WEBPACK_IMPORTED_MODULE_3__models_supplier_model__["a" /* Supplier */](3, "Modified Supplier", "New York", "NY");
        this.repo.replaceSupplier(s);
    };
    AppComponent.prototype.updateProduct = function () {
        var changes = new Map();
        changes.set("name", "Green Kayak");
        changes.set("supplier", null);
        this.repo.updateProduct(1, changes);
    };
    AppComponent.prototype.deleteProduct = function () {
        this.repo.deleteProduct(1);
    };
    AppComponent.prototype.deleteSupplier = function () {
        this.repo.deleteSupplier(2);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(181),
        styles: [__webpack_require__(174)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_model_module__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_store_module__ = __webpack_require__(119);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { ProductTableComponent } from "./structure/productTable.component"
//import { CategoryFilterComponent } from "./structure/categoryFilter.component"
//import { ProductDetailComponent } from "./structure/productDetail.component";


var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_5__models_model_module__["a" /* ModelModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* RoutingConfig */], __WEBPACK_IMPORTED_MODULE_7__store_store_module__["a" /* StoreModule */]],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_cartDetail_component__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_checkout_checkoutPayment_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_checkout_checkoutSummary_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_checkout_orderConfirmation_component__ = __webpack_require__(76);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingConfig; });







var routes = [
    { path: "checkout/step1", component: __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */] },
    { path: "checkout/step2", component: __WEBPACK_IMPORTED_MODULE_4__store_checkout_checkoutPayment_component__["a" /* CheckoutPaymentComponent */] },
    { path: "checkout/step3", component: __WEBPACK_IMPORTED_MODULE_5__store_checkout_checkoutSummary_component__["a" /* CheckoutSummaryComponent */] },
    { path: "checkout/confirmation", component: __WEBPACK_IMPORTED_MODULE_6__store_checkout_orderConfirmation_component__["a" /* OrderConfirmationComponent */] },
    { path: "checkout", component: __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */] },
    { path: "cart", component: __WEBPACK_IMPORTED_MODULE_2__store_cartDetail_component__["a" /* CartDetailComponent */] },
    { path: "store", component: __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__["a" /* ProductSelectionComponent */] },
    { path: "", component: __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__["a" /* ProductSelectionComponent */] }
];
var RoutingConfig = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Pagination; });
var Filter = (function () {
    function Filter() {
        this.related = false;
    }
    Filter.prototype.reset = function () {
        this.category = this.search = null;
        this.related = false;
    };
    return Filter;
}());

var Pagination = (function () {
    function Pagination() {
        this.productsPerPage = 4;
        this.currentPage = 1;
    }
    return Pagination;
}());

//# sourceMappingURL=configClasses.repository.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_model__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_model__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModelModule = (function () {
    function ModelModule() {
    }
    return ModelModule;
}());
ModelModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        providers: [__WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */], __WEBPACK_IMPORTED_MODULE_2__cart_model__["a" /* Cart */], __WEBPACK_IMPORTED_MODULE_3__order_model__["a" /* Order */]]
    })
], ModelModule);

//# sourceMappingURL=model.module.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Supplier; });
var Supplier = (function () {
    function Supplier(supplierId, name, city, state) {
        this.supplierId = supplierId;
        this.name = name;
        this.city = city;
        this.state = state;
    }
    return Supplier;
}());

//# sourceMappingURL=supplier.model.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_model__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartSummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartSummaryComponent = (function () {
    function CartSummaryComponent(cart) {
        this.cart = cart;
    }
    Object.defineProperty(CartSummaryComponent.prototype, "itemCount", {
        get: function () {
            return this.cart.itemCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartSummaryComponent.prototype, "totalPrice", {
        get: function () {
            return this.cart.totalPrice;
        },
        enumerable: true,
        configurable: true
    });
    return CartSummaryComponent;
}());
CartSummaryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-cartsummary",
        template: __webpack_require__(183)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]) === "function" && _a || Object])
], CartSummaryComponent);

var _a;
//# sourceMappingURL=cartSummary.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryFilterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryFilterComponent = (function () {
    function CategoryFilterComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(CategoryFilterComponent.prototype, "categories", {
        get: function () {
            return this.repo.categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryFilterComponent.prototype, "currentCategory", {
        get: function () {
            return this.repo.filter.category;
        },
        enumerable: true,
        configurable: true
    });
    CategoryFilterComponent.prototype.setCurrentCategory = function (newCategory) {
        this.repo.filter.category = newCategory;
        this.repo.getProducts();
    };
    return CategoryFilterComponent;
}());
CategoryFilterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-categoryfilter",
        template: __webpack_require__(184)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], CategoryFilterComponent);

var _a;
//# sourceMappingURL=categoryFilter.component.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginationComponent = (function () {
    function PaginationComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(PaginationComponent.prototype, "current", {
        get: function () {
            return this.repo.pagination.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pages", {
        get: function () {
            if (this.repo.products != null) {
                return Array(Math.ceil(this.repo.products.length
                    / this.repo.pagination.productsPerPage))
                    .fill(0).map(function (x, i) { return i + 1; });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.changePage = function (newPage) {
        this.repo.pagination.currentPage = newPage;
    };
    return PaginationComponent;
}());
PaginationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-pagination",
        template: __webpack_require__(189)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], PaginationComponent);

var _a;
//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_cart_model__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-product-list",
        template: __webpack_require__(190)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_cart_model__["a" /* Cart */]) === "function" && _b || Object])
], ProductListComponent);

var _a, _b;
//# sourceMappingURL=productList.component.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_product_model__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RatingsComponent = (function () {
    function RatingsComponent() {
    }
    Object.defineProperty(RatingsComponent.prototype, "stars", {
        get: function () {
            if (this.product != null && this.product.ratings != null) {
                var total = this.product.ratings.map(function (r) { return r.stars; })
                    .reduce(function (prev, curr) { return prev + curr; }, 0);
                var count_1 = Math.round(total / this.product.ratings.length);
                return Array(5).fill(false).map(function (value, index) {
                    return index < count_1;
                });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    return RatingsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_product_model__["a" /* Product */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_product_model__["a" /* Product */]) === "function" && _a || Object)
], RatingsComponent.prototype, "product", void 0);
RatingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-ratings",
        template: __webpack_require__(192)
    })
], RatingsComponent);

var _a;
//# sourceMappingURL=ratings.component.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cartSummary_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categoryFilter_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pagination_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__productList_component__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ratings_component__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__productSelection_component__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cartDetail_component__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__checkout_checkoutDetails_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__checkout_checkoutPayment_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__checkout_checkoutSummary_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__checkout_orderConfirmation_component__ = __webpack_require__(76);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var StoreModule = (function () {
    function StoreModule() {
    }
    return StoreModule;
}());
StoreModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__cartSummary_component__["a" /* CartSummaryComponent */], __WEBPACK_IMPORTED_MODULE_3__categoryFilter_component__["a" /* CategoryFilterComponent */],
            __WEBPACK_IMPORTED_MODULE_4__pagination_component__["a" /* PaginationComponent */], __WEBPACK_IMPORTED_MODULE_5__productList_component__["a" /* ProductListComponent */], __WEBPACK_IMPORTED_MODULE_6__ratings_component__["a" /* RatingsComponent */],
            __WEBPACK_IMPORTED_MODULE_7__productSelection_component__["a" /* ProductSelectionComponent */], __WEBPACK_IMPORTED_MODULE_8__cartDetail_component__["a" /* CartDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_11__checkout_checkoutDetails_component__["a" /* CheckoutDetailsComponent */], __WEBPACK_IMPORTED_MODULE_12__checkout_checkoutPayment_component__["a" /* CheckoutPaymentComponent */],
            __WEBPACK_IMPORTED_MODULE_13__checkout_checkoutSummary_component__["a" /* CheckoutSummaryComponent */], __WEBPACK_IMPORTED_MODULE_14__checkout_orderConfirmation_component__["a" /* OrderConfirmationComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_9__angular_router__["a" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_7__productSelection_component__["a" /* ProductSelectionComponent */]]
    })
], StoreModule);

//# sourceMappingURL=store.module.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Repository; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var productsUrl = "/api/products";
var suppliersUrl = "/api/suppliers";
var ordersUrl = "/api/orders";
var Repository = (function () {
    function Repository(http) {
        this.http = http;
        this.filterObject = new __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__["a" /* Filter */]();
        this.paginationObject = new __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__["b" /* Pagination */]();
        this.suppliers = [];
        this.categories = [];
        this.orders = [];
        //this.filter.category = "soccer";
        this.filter.related = true;
        this.getProducts();
    }
    Repository.prototype.getProduct = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Get, productsUrl + "/" + id)
            .subscribe(function (response) { return _this.product = response; });
    };
    Repository.prototype.getProducts = function () {
        var _this = this;
        var url = productsUrl + "?related=" + this.filter.related;
        if (this.filter.category) {
            url += "&category=" + this.filter.category;
        }
        if (this.filter.search) {
            url += "&search=" + this.filter.search;
        }
        url += "&metadata=true";
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Get, url)
            .subscribe(function (response) {
            _this.products = response.data;
            _this.categories = response.categories;
            _this.pagination.currentPage = 1;
        });
    };
    Repository.prototype.getSuppliers = function () {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Get, suppliersUrl)
            .subscribe(function (response) { return _this.suppliers = response; });
    };
    Repository.prototype.createProduct = function (prod) {
        var _this = this;
        var data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Post, productsUrl, data)
            .subscribe(function (response) {
            prod.productId = response;
            _this.products.push(prod);
        });
    };
    Repository.prototype.createProductAndSupplier = function (prod, supp) {
        var _this = this;
        var data = {
            name: supp.name, city: supp.city, state: supp.state
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Post, suppliersUrl, data)
            .subscribe(function (response) {
            supp.supplierId = response;
            prod.supplier = supp;
            _this.suppliers.push(supp);
            if (prod != null) {
                _this.createProduct(prod);
            }
        });
    };
    Repository.prototype.replaceProduct = function (prod) {
        var _this = this;
        var data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Put, productsUrl + "/" + prod.productId, data)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.replaceSupplier = function (supp) {
        var _this = this;
        var data = {
            name: supp.name, city: supp.city, state: supp.state
        };
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Put, suppliersUrl + "/" + supp.supplierId, data)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.sendRequest = function (verb, url, data) {
        return this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Request */]({
            method: verb, url: url, body: data
        })).map(function (response) {
            return response.headers.get("Content-Length") != "0"
                ? response.json() : null;
        });
    };
    Repository.prototype.updateProduct = function (id, changes) {
        var _this = this;
        var patch = [];
        changes.forEach(function (value, key) {
            return patch.push({ op: "replace", path: key, value: value });
        });
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Patch, productsUrl + "/" + id, patch)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.deleteProduct = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Delete, productsUrl + "/" + id)
            .subscribe(function (response) { return _this.getProducts(); });
    };
    Repository.prototype.deleteSupplier = function (id) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Delete, suppliersUrl + "/" + id)
            .subscribe(function (response) {
            _this.getProducts();
            _this.getSuppliers();
        });
    };
    Repository.prototype.storeSessionData = function (dataType, data) {
        return this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Post, "/api/session/" + dataType, data)
            .subscribe(function (response) { });
    };
    Repository.prototype.getSessionData = function (dataType) {
        return this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Get, "/api/session/" + dataType);
    };
    Repository.prototype.getOrders = function () {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Get, ordersUrl)
            .subscribe(function (data) { return _this.orders = data; });
    };
    Repository.prototype.createOrder = function (order) {
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Post, ordersUrl, {
            name: order.name,
            address: order.address,
            payment: order.payment,
            products: order.products
        }).subscribe(function (data) {
            order.orderConfirmation = data;
            order.cart.clear();
            order.clear();
        });
    };
    Repository.prototype.shipOrder = function (order) {
        var _this = this;
        this.sendRequest(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestMethod */].Post, ordersUrl + "/" + order.orderId)
            .subscribe(function (r) { return _this.getOrders(); });
    };
    Object.defineProperty(Repository.prototype, "filter", {
        get: function () {
            return this.filterObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Repository.prototype, "pagination", {
        get: function () {
            return this.paginationObject;
        },
        enumerable: true,
        configurable: true
    });
    return Repository;
}());
Repository = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], Repository);

var _a;
//# sourceMappingURL=repository.js.map

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(56)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 182:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<div class=\"m-1\">\n    <h2 class=\"text-center\">Your Cart</h2>\n    <table class=\"table table-bordered table-striped p-1\">\n        <thead>\n            <tr>\n                <th>Quantity</th><th>Product</th>\n                <th class=\"text-right\">Price</th>\n                <th class=\"text-right\">Subtotal</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngIf=\"cart.selections.length == 0\">\n                <td colspan=\"4\" class=\"text-xs-center\">\n                    Your cart is empty\n                </td>\n            </tr>\n            <tr *ngFor=\"let sel of cart.selections\">\n                <td>\n                    <input type=\"number\" class=\"form-control-sm\"\n                           style=\"width:5em\" [(ngModel)]=\"sel.quantity\" />\n                </td>\n                <td>{{sel.name}}</td>\n                <td class=\"text-right\">\n                    {{sel.price | currency:\"USD\":true:\"2.2-2\"}}\n                </td>\n                <td class=\"text-right\">\n                    {{(sel.quantity * sel.price) | currency:\"USD\":true:\"2.2-2\" }}\n                </td>\n                <td class=\"text-center\">\n                    <button class=\"btn btn-sm btn-danger\"\n                            (click)=\"cart.updateQuantity(sel.productId, 0)\">\n                        Remove\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n        <tfoot>\n            <tr>\n                <td colspan=\"3\" class=\"text-right\">Total:</td>\n                <td class=\"text-right\">\n                    {{cart.totalPrice | currency:\"USD\":true:\"2.2-2\"}}\n                </td>\n            </tr>\n        </tfoot>\n    </table>\n</div>\n<div class=\"text-center\">\n    <button class=\"btn btn-primary\" routerLink=\"/store\">Continue Shopping</button>\n    <button class=\"btn btn-secondary\" routerLink=\"/checkout\"\n            [disabled]=\"cart.selections.length == 0\">\n        Checkout\n    </button>\n</div>\n"

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

module.exports = "<div class=\"text-right p-1\">\n    <small *ngIf=\"itemCount > 0; else empty\">\n        ({{ itemCount }} item(s) {{ totalPrice | currency:\"USD\":true }})\n    </small>\n    <button class=\"btn btn-sm ml-1\" \n            [disabled]=\"itemCount == 0\"\n            routerLink=\"/cart\">\n        <i class=\"fa fa-shopping-cart\"></i>\n    </button>\n</div>\n\n<ng-template #empty>\n    <small class=\"text-muted\">\n        (cart is empty)\n    </small>\n</ng-template>\n"

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

module.exports = "<div class=\"m-1\">\n    <button class=\"btn btn-outline-primary btn-block\"\n            (click)=\"setCurrentCategory(null)\">\n        All Categories\n    </button>\n    <button *ngFor=\"let category of categories\" \n            class=\"btn btn-outline-primary btn-block\"\n            [class.active]=\"currentCategory == category\"\n            (click)=\"setCurrentCategory(category)\">\n        {{category}}\n    </button>\n</div>\n"

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<h2 class=\"text-center mt-1\">Step 1: Your Details</h2>\n\n<form novalidate #detailsForm=\"ngForm\">\n    <div class=\"form-group\">\n        <label>Name</label>\n        <input #name=\"ngModel\" name=\"name\" class=\"form-control\"\n               [(ngModel)]=\"order.name\" required />\n        <div *ngIf=\"name.invalid\" class=\"text-danger\">\n            Please enter your name\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Address</label>\n        <input #address=\"ngModel\" name=\"street\" class=\"form-control\"\n               [(ngModel)]=\"order.address\" required />\n        <div *ngIf=\"address.invalid\" class=\"text-danger\">\n            Please enter your address\n        </div>\n    </div>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/cart\">Back</button>\n        <button class=\"btn btn-danger\" [disabled]=\"detailsForm.invalid\"\n                routerLink=\"/checkout/step2\">\n            Next\n        </button>\n    </div>\n</form>\n"

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<h2 class=\"text-center mt-1\">Step 2: Payment</h2>\n\n<form novalidate #paymentForm=\"ngForm\">\n    <div class=\"form-group\">\n        <label>Card Number</label>\n        <input #cardNumber=\"ngModel\" name=\"cardNumber\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardNumber\" required />\n        <div *ngIf=\"cardNumber.invalid\" class=\"text-danger\">\n            Please enter your card number\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Card Expiry</label>\n        <input #cardExpiry=\"ngModel\" name=\"cardExpiry\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardExpiry\" required />\n        <div *ngIf=\"cardExpiry.invalid\" class=\"text-danger\">\n            Please enter your card expiry\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Security Code</label>\n        <input #cardCode=\"ngModel\" name=\"cardCode\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardSecurityCode\" required />\n        <div *ngIf=\"cardCode.invalid\" class=\"text-danger\">\n            Please enter your security code\n        </div>\n    </div>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step1\">\n            Back\n        </button>\n        <button class=\"btn btn-danger\" [disabled]=\"paymentForm.invalid\"\n                routerLink=\"/checkout/step3\">Next</button>\n    </div>\n</form>\n"

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Summary</h2>\n\n<div class=\"container\">\n    <table class=\"table m-2\">\n        <tr><th>Name</th><td>{{order.name}}</td></tr>\n        <tr><th>Address</th><td>{{order.address}}</td></tr>\n        <tr><th>Products</th><td>{{order.cart.itemCount}}</td></tr>\n        <tr>\n            <th>Total Price</th>\n            <td>{{order.cart.totalPrice | currency:USD:true }}</td>\n        </tr>\n    </table>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step2\">\n            Back\n        </button>\n        <button class=\"btn btn-danger\" (click)=\"submitOrder()\">\n            Place Order\n        </button>\n    </div>\n</div>\n"

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Order Confirmation</h2>\n\n<div class=\"container\">\n    <table *ngIf=\"order.orderConfirmation; else nodata\" class=\"table m-2\">\n        <tr><th>Order</th><td>{{order.orderConfirmation.orderId}}</td></tr>\n        <tr><th>Price</th><td>{{order.orderConfirmation.amount}}</td></tr>\n        <tr><th>Payment Code</th><td>{{order.orderConfirmation.authCode}}</td></tr>\n    </table>\n    <div class=\"text-center\">\n        <button class=\"btn btn-primary\" routerLink=\"/\">Done</button>\n    </div>\n\n    <ng-template #nodata>\n        <h3 class=\"text-center\">Submitting Order...</h3>\n    </ng-template>\n</div>\n"

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"pages.length > 1\" class=\"text-right my-2\">\n    <button *ngFor=\"let page of pages\" \n            class=\"btn btn-outline-primary mx-1\"\n            [class.active]=\"current == page\"\n            (click)=\"changePage(page)\">\n        {{page}}\n    </button>\n</div>\n"

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cart; });
/* unused harmony export ProductSelection */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */]) === "function" && _a || Object])
], Cart);

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

var _a;
//# sourceMappingURL=cart.model.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"products?.length > 0; else nodata\">\n    <div *ngFor=\"let product of products\" class=\"card card-outline-primary m-1\">\n        <div class=\"card-header\">\n            <span class=\"h4\">\n                {{product.name}}\n                <store-ratings [product]=\"product\"></store-ratings> \n            </span>\n            <span class=\"float-right badge badge-pill badge-primary\">\n                {{product.price  | currency:\"USD\":true }}\n            </span>\n        </div>\n        <div class=\"card-block\">\n            <span class=\"card-text p-a-1\">{{product.description}}</span>\n            <button class=\"float-right btn btn-sm btn-success\"\n                    (click)=\"addToCart(product)\">\n                Add to Cart\n            </button>\n        </div>\n    </div>\n</div>\n\n<ng-template #nodata>\n    <h4 class=\"m-1\">Waiting for data...</h4>\n</ng-template>\n"

/***/ }),

/***/ 191:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">    \n    <div class=\"row\">\n        <div class=\"col\">\n            <a class=\"navbar-brand text-white\">\n                SPORTS STORE\n            </a>\n        </div>\n        <div class=\"col text-white mr-1\">\n            <store-cartsummary></store-cartsummary>\n        </div>\n    </div>\n</div>\n<div class=\"row no-gutters\">\n    <div class=\"col-3\">\n        <store-categoryfilter></store-categoryfilter>\n    </div>\n    <div class=\"col\">\n        <store-product-list></store-product-list>\n        <store-pagination></store-pagination>\n    </div>\n</div>\n"

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

module.exports = "<span class=\"h6 ml-1\">\n    <i *ngFor=\"let s of stars\"\n        [class]=\"s ? 'fa fa-star' : 'fa fa-star-o'\"\n        [style.color]=\"s ? 'goldenrod' : 'gray'\">\n    </i>     \n</span>\n"

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cart_model__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repository__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order; });
/* unused harmony export Payment */
/* unused harmony export CartLine */
/* unused harmony export OrderConfirmation */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Order = (function () {
    function Order(repo, cart, router) {
        var _this = this;
        this.repo = repo;
        this.cart = cart;
        this.payment = new Payment();
        this.submitted = false;
        this.shipped = false;
        router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* NavigationStart */]; })
            .subscribe(function (event) {
            if (router.url.startsWith("/checkout")
                && _this.name != null && _this.address != null) {
                repo.storeSessionData("checkout", {
                    name: _this.name,
                    address: _this.address,
                    cardNumber: _this.payment.cardNumber,
                    cardExpiry: _this.payment.cardExpiry,
                    cardSecurityCode: _this.payment.cardSecurityCode
                });
            }
        });
        repo.getSessionData("checkout").subscribe(function (data) {
            if (data != null) {
                _this.name = data.name;
                _this.address = data.address;
                _this.payment.cardNumber = data.cardNumber;
                _this.payment.cardExpiry = data.cardExpiry;
                _this.payment.cardSecurityCode = data.cardSecurityCode;
            }
        });
    }
    Object.defineProperty(Order.prototype, "products", {
        get: function () {
            return this.cart.selections
                .map(function (p) { return new CartLine(p.productId, p.quantity); });
        },
        enumerable: true,
        configurable: true
    });
    Order.prototype.clear = function () {
        this.name = null;
        this.address = null;
        this.payment = new Payment();
        this.cart.clear();
        this.submitted = false;
    };
    Order.prototype.submit = function () {
        this.submitted = true;
        this.repo.createOrder(this);
    };
    return Order;
}());
Order = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__repository__["a" /* Repository */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cart_model__["a" /* Cart */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], Order);

var Payment = (function () {
    function Payment() {
    }
    return Payment;
}());

var CartLine = (function () {
    function CartLine(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
    return CartLine;
}());

var OrderConfirmation = (function () {
    function OrderConfirmation(orderId, authCode, amount) {
        this.orderId = orderId;
        this.authCode = authCode;
        this.amount = amount;
    }
    return OrderConfirmation;
}());

var _a, _b, _c;
//# sourceMappingURL=order.model.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
module.exports = __webpack_require__(103);


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 68;

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Product; });
var Product = (function () {
    function Product(productId, name, category, description, price, supplier, ratings) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.supplier = supplier;
        this.ratings = ratings;
    }
    return Product;
}());

//# sourceMappingURL=product.model.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_model__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartDetailComponent = (function () {
    function CartDetailComponent(cart) {
        this.cart = cart;
    }
    return CartDetailComponent;
}());
CartDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(182)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]) === "function" && _a || Object])
], CartDetailComponent);

var _a;
//# sourceMappingURL=cartDetail.component.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutDetailsComponent = (function () {
    function CheckoutDetailsComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.products.length == 0) {
            this.router.navigateByUrl("/cart");
        }
    }
    return CheckoutDetailsComponent;
}());
CheckoutDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(185)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutDetailsComponent);

var _a, _b;
//# sourceMappingURL=checkoutDetails.component.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPaymentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutPaymentComponent = (function () {
    function CheckoutPaymentComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.name == null || order.address == null) {
            router.navigateByUrl("/checkout/step1");
        }
    }
    return CheckoutPaymentComponent;
}());
CheckoutPaymentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(186)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutPaymentComponent);

var _a, _b;
//# sourceMappingURL=checkoutPayment.component.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutSummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CheckoutSummaryComponent = (function () {
    function CheckoutSummaryComponent(router, order) {
        this.router = router;
        this.order = order;
        if (order.payment.cardNumber == null
            || order.payment.cardExpiry == null
            || order.payment.cardSecurityCode == null) {
            router.navigateByUrl("/checkout/step2");
        }
    }
    CheckoutSummaryComponent.prototype.submitOrder = function () {
        this.order.submit();
        this.router.navigateByUrl("/checkout/confirmation");
    };
    return CheckoutSummaryComponent;
}());
CheckoutSummaryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(187)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutSummaryComponent);

var _a, _b;
//# sourceMappingURL=checkoutSummary.component.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_order_model__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderConfirmationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderConfirmationComponent = (function () {
    function OrderConfirmationComponent(router, order) {
        this.router = router;
        this.order = order;
        if (!order.submitted) {
            router.navigateByUrl("/checkout/step3");
        }
    }
    return OrderConfirmationComponent;
}());
OrderConfirmationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        template: __webpack_require__(188)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], OrderConfirmationComponent);

var _a, _b;
//# sourceMappingURL=orderConfirmation.component.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductSelectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProductSelectionComponent = (function () {
    function ProductSelectionComponent() {
    }
    return ProductSelectionComponent;
}());
ProductSelectionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Component */])({
        selector: "store-products",
        template: __webpack_require__(191)
    })
], ProductSelectionComponent);

//# sourceMappingURL=productSelection.component.js.map

/***/ })

},[228]);
//# sourceMappingURL=main.bundle.js.map