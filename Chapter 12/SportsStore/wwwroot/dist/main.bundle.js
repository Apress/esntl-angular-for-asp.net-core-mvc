webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configClasses_repository__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errorHandler_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
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
        })
            .catch(function (errorResponse) {
            if (errorResponse.status == 400) {
                var jsonData_1;
                try {
                    jsonData_1 = errorResponse.json();
                }
                catch (e) {
                    throw new Error("Network Error");
                }
                var messages = Object.getOwnPropertyNames(jsonData_1).map(function (p) { return jsonData_1[p]; });
                throw new __WEBPACK_IMPORTED_MODULE_4__errorHandler_service__["b" /* ValidationError */](messages);
            }
            throw new Error("Network Error");
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
    Repository.prototype.login = function (name, password) {
        return this.http.post("/api/account/login", { name: name, password: password });
    };
    Repository.prototype.logout = function () {
        this.http.post("/api/account/logout", null).subscribe(function (respone) { });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], Repository);

var _a;
//# sourceMappingURL=repository.js.map

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(5);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cart_model__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repository__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(206);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
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
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(false);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthenticationService);

var _a, _b;
//# sourceMappingURL=authentication.service.js.map

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorHandlerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ValidationError; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ErrorHandlerService = (function () {
    function ErrorHandlerService() {
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    ErrorHandlerService.prototype.handleError = function (error) {
        var _this = this;
        setTimeout(function () {
            if (error instanceof ValidationError) {
                _this.subject.next(error.errors);
            }
            else if (error instanceof Error) {
                _this.subject.next([error.message]);
            }
            else {
                _this.subject.next(["An error has occurred"]);
            }
        });
    };
    Object.defineProperty(ErrorHandlerService.prototype, "errors", {
        get: function () {
            return this.subject;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorHandlerService;
}());
ErrorHandlerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])()
], ErrorHandlerService);

var ValidationError = (function () {
    function ValidationError(errors) {
        this.errors = errors;
    }
    return ValidationError;
}());

//# sourceMappingURL=errorHandler.service.js.map

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 64;

/***/ }),
/* 65 */,
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_authentication_service__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = (function () {
    function AdminComponent(repo, authService) {
        this.repo = repo;
        this.authService = authService;
        repo.filter.reset();
        repo.filter.related = true;
        this.repo.getProducts();
        this.repo.getSuppliers();
        this.repo.getOrders();
    }
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(182)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], AdminComponent);

var _a, _b;
//# sourceMappingURL=admin.component.js.map

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderAdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderAdminComponent = (function () {
    function OrderAdminComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(OrderAdminComponent.prototype, "orders", {
        get: function () {
            return this.repo.orders;
        },
        enumerable: true,
        configurable: true
    });
    OrderAdminComponent.prototype.markShipped = function (order) {
        this.repo.shipOrder(order);
    };
    return OrderAdminComponent;
}());
OrderAdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(183)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], OrderAdminComponent);

var _a;
//# sourceMappingURL=orderAdmin.component.js.map

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OverviewComponent = (function () {
    function OverviewComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(OverviewComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverviewComponent.prototype, "orders", {
        get: function () {
            return this.repo.orders;
        },
        enumerable: true,
        configurable: true
    });
    return OverviewComponent;
}());
OverviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(184)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], OverviewComponent);

var _a;
//# sourceMappingURL=overview.component.js.map

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_product_model__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductAdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductAdminComponent = (function () {
    function ProductAdminComponent(repo) {
        this.repo = repo;
        this.tableMode = true;
    }
    Object.defineProperty(ProductAdminComponent.prototype, "product", {
        get: function () {
            return this.repo.product;
        },
        enumerable: true,
        configurable: true
    });
    ProductAdminComponent.prototype.selectProduct = function (id) {
        this.repo.getProduct(id);
    };
    ProductAdminComponent.prototype.saveProduct = function () {
        if (this.repo.product.productId == null) {
            this.repo.createProduct(this.repo.product);
        }
        else {
            this.repo.replaceProduct(this.repo.product);
        }
        this.clearProduct();
        this.tableMode = true;
    };
    ProductAdminComponent.prototype.deleteProduct = function (id) {
        this.repo.deleteProduct(id);
    };
    ProductAdminComponent.prototype.clearProduct = function () {
        this.repo.product = new __WEBPACK_IMPORTED_MODULE_2__models_product_model__["a" /* Product */]();
        this.tableMode = true;
    };
    Object.defineProperty(ProductAdminComponent.prototype, "products", {
        get: function () {
            return this.repo.products;
        },
        enumerable: true,
        configurable: true
    });
    return ProductAdminComponent;
}());
ProductAdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(185)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], ProductAdminComponent);

var _a;
//# sourceMappingURL=productAdmin.component.js.map

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authentication_service__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthenticationComponent = (function () {
    function AuthenticationComponent(authService) {
        this.authService = authService;
        this.showError = false;
    }
    AuthenticationComponent.prototype.login = function () {
        var _this = this;
        this.showError = false;
        this.authService.login().subscribe(function (result) {
            _this.showError = !result;
        });
    };
    return AuthenticationComponent;
}());
AuthenticationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(188)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object])
], AuthenticationComponent);

var _a;
//# sourceMappingURL=authentication.component.js.map

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationGuard = (function () {
    function AuthenticationGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthenticationGuard.prototype.canActivateChild = function (route, state) {
        if (this.authService.authenticated) {
            return true;
        }
        else {
            this.authService.callbackUrl = "/admin/" + route.url.toString();
            this.router.navigateByUrl("/login");
            return false;
        }
    };
    return AuthenticationGuard;
}());
AuthenticationGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], AuthenticationGuard);

var _a, _b;
//# sourceMappingURL=authentication.guard.js.map

/***/ }),
/* 72 */
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
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(189)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]) === "function" && _a || Object])
], CartDetailComponent);

var _a;
//# sourceMappingURL=cartDetail.component.js.map

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(192)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutDetailsComponent);

var _a, _b;
//# sourceMappingURL=checkoutDetails.component.js.map

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(193)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutPaymentComponent);

var _a, _b;
//# sourceMappingURL=checkoutPayment.component.js.map

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(194)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], CheckoutSummaryComponent);

var _a, _b;
//# sourceMappingURL=checkoutSummary.component.js.map

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(195)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_order_model__["a" /* Order */]) === "function" && _b || Object])
], OrderConfirmationComponent);

var _a, _b;
//# sourceMappingURL=orderConfirmation.component.js.map

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-products",
        template: __webpack_require__(198)
    })
], ProductSelectionComponent);

//# sourceMappingURL=productSelection.component.js.map

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(113);



var bootApplication = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
};
// if (module["hot"]) {
//     module["hot"].accept();
//     module["hot"].dispose(() => {
//         const oldRootElem = document.querySelector("app-root");
//         const newRootElem = document.createElement("app-root");
//         oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
//         platformBrowserDynamic().destroy();
//     });
// }
if (document.readyState === "complete") {
    bootApplication();
}
else {
    document.addEventListener("DOMContentLoaded", bootApplication);
}
//# sourceMappingURL=boot.js.map

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overview_component__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__productAdmin_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__orderAdmin_component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productEditor_component__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__admin_component__["a" /* AdminComponent */], __WEBPACK_IMPORTED_MODULE_5__overview_component__["a" /* OverviewComponent */],
            __WEBPACK_IMPORTED_MODULE_6__productAdmin_component__["a" /* ProductAdminComponent */], __WEBPACK_IMPORTED_MODULE_7__orderAdmin_component__["a" /* OrderAdminComponent */], __WEBPACK_IMPORTED_MODULE_8__productEditor_component__["a" /* ProductEditorComponent */]]
    })
], AdminModule);

//# sourceMappingURL=admin.module.js.map

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "admin-product-editor",
        template: __webpack_require__(186)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], ProductEditorComponent);

var _a;
//# sourceMappingURL=productEditor.component.js.map

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorHandler_service__ = __webpack_require__(38);
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
    function AppComponent(errorHandler) {
        var _this = this;
        errorHandler.errors.subscribe(function (error) {
            _this.lastError = error;
        });
    }
    Object.defineProperty(AppComponent.prototype, "error", {
        get: function () {
            return this.lastError;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.clearError = function () {
        this.lastError = null;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "app-root",
        template: __webpack_require__(187)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__errorHandler_service__["a" /* ErrorHandlerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__errorHandler_service__["a" /* ErrorHandlerService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_model_module__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_store_module__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_admin_module__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_auth_module__ = __webpack_require__(115);
/* unused harmony export handler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var eHandler = new __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__["a" /* ErrorHandlerService */]();
function handler() {
    return eHandler;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_5__models_model_module__["a" /* ModelModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* RoutingConfig */], __WEBPACK_IMPORTED_MODULE_7__store_store_module__["a" /* StoreModule */], __WEBPACK_IMPORTED_MODULE_8__admin_admin_module__["a" /* AdminModule */], __WEBPACK_IMPORTED_MODULE_10__auth_auth_module__["a" /* AuthModule */]],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_9__errorHandler_service__["a" /* ErrorHandlerService */], useFactory: handler },
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* ErrorHandler */], useFactory: handler }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_productSelection_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_cartDetail_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_checkout_checkoutDetails_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_checkout_checkoutPayment_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_checkout_checkoutSummary_component__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_checkout_orderConfirmation_component__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_admin_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__admin_productAdmin_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_orderAdmin_component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_authentication_guard__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__auth_authentication_component__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingConfig; });













var routes = [
    { path: "login", component: __WEBPACK_IMPORTED_MODULE_12__auth_authentication_component__["a" /* AuthenticationComponent */] },
    { path: "admin", redirectTo: "/admin/overview", pathMatch: "full" },
    {
        path: "admin", component: __WEBPACK_IMPORTED_MODULE_7__admin_admin_component__["a" /* AdminComponent */],
        canActivateChild: [__WEBPACK_IMPORTED_MODULE_11__auth_authentication_guard__["a" /* AuthenticationGuard */]],
        children: [
            { path: "products", component: __WEBPACK_IMPORTED_MODULE_9__admin_productAdmin_component__["a" /* ProductAdminComponent */], },
            { path: "orders", component: __WEBPACK_IMPORTED_MODULE_10__admin_orderAdmin_component__["a" /* OrderAdminComponent */] },
            { path: "overview", component: __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__["a" /* OverviewComponent */] },
            { path: "", component: __WEBPACK_IMPORTED_MODULE_8__admin_overview_component__["a" /* OverviewComponent */] }
        ]
    },
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
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authentication_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authentication_component__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__authentication_guard__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__authentication_component__["a" /* AuthenticationComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_6__authentication_guard__["a" /* AuthenticationGuard */]],
        exports: [__WEBPACK_IMPORTED_MODULE_5__authentication_component__["a" /* AuthenticationComponent */]]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map

/***/ }),
/* 116 */
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
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(5);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        providers: [__WEBPACK_IMPORTED_MODULE_1__repository__["a" /* Repository */], __WEBPACK_IMPORTED_MODULE_2__cart_model__["a" /* Cart */], __WEBPACK_IMPORTED_MODULE_3__order_model__["a" /* Order */]]
    })
], ModelModule);

//# sourceMappingURL=model.module.js.map

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-cartsummary",
        template: __webpack_require__(190)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_cart_model__["a" /* Cart */]) === "function" && _a || Object])
], CartSummaryComponent);

var _a;
//# sourceMappingURL=cartSummary.component.js.map

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-categoryfilter",
        template: __webpack_require__(191)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], CategoryFilterComponent);

var _a;
//# sourceMappingURL=categoryFilter.component.js.map

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-pagination",
        template: __webpack_require__(196)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object])
], PaginationComponent);

var _a;
//# sourceMappingURL=pagination.component.js.map

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_repository__ = __webpack_require__(5);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-product-list",
        template: __webpack_require__(197)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_repository__["a" /* Repository */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_cart_model__["a" /* Cart */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_cart_model__["a" /* Cart */]) === "function" && _b || Object])
], ProductListComponent);

var _a, _b;
//# sourceMappingURL=productList.component.js.map

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_product_model__ = __webpack_require__(72);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_product_model__["a" /* Product */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_product_model__["a" /* Product */]) === "function" && _a || Object)
], RatingsComponent.prototype, "product", void 0);
RatingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: "store-ratings",
        template: __webpack_require__(199)
    })
], RatingsComponent);

var _a;
//# sourceMappingURL=ratings.component.js.map

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cartSummary_component__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categoryFilter_component__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pagination_component__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__productList_component__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ratings_component__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__productSelection_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cartDetail_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__checkout_checkoutDetails_component__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__checkout_checkoutPayment_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__checkout_checkoutSummary_component__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__checkout_orderConfirmation_component__ = __webpack_require__(77);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
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
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-info mb-1\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <a class=\"navbar-brand text-white\">SPORTS STORE Admin</a>\n        </div>\n        <div class=\"col text-right\">\n            <button class=\"btn btn-sm btn-warning\" \n                (click)=\"authService.logout()\">\n                Log Out\n            </button>\n        </div>\n    </div>        \n</div>\n\n<div class=\"row no-gutters\">\n    <div class=\"col-3\">\n        <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin\"\n                routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n            Overview\n        </button>\n        <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin/products\"\n                routerLinkActive=\"active\">Products</button>\n        <button class=\"btn btn-block btn-outline-info\" routerLink=\"/admin/orders\"\n                routerLinkActive=\"active\">Orders</button>\n    </div>\n    <div class=\"col p-2\">\n        <router-outlet></router-outlet>\n    </div>\n</div>\n"

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = "<table *ngIf=\"orders?.length > 0; else nodata\" class=\"table table-striped\">\n    <tr>\n        <th>Customer</th><th>Address</th><th>Products</th>\n        <th>Total</th><th></th>\n    </tr>\n    <tr *ngFor=\"let o of orders\">\n        <td>{{o.name}}</td>\n        <td>{{o.address}}</td>\n        <td>{{o.products.length}}</td>\n        <td>{{o.payment.total | currency:USD:true}}</td>\n        <td *ngIf=\"!o.shipped; else shipped\">\n            <button class=\"btn btn-sm btn-primary\" \n                    (click)=\"markShipped(o)\">\n                Ship\n            </button>\n        </td>\n    </tr>\n</table>\n\n<ng-template #shipped>\n    <td>Shipped</td>\n</ng-template>\n\n<ng-template #nodata>\n    <h3 class=\"text-center\">There are no orders</h3>\n</ng-template>\n"

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = "<table class=\"table m-1\">\n    <tr>\n        <td>There are {{products?.length || 0}} products for sale</td>\n        <td><button class=\"btn btn-sm btn-info btn-block\" \n                    routerLink=\"/admin/products\">Manage Products</button></td>\n    </tr>\n    <tr>\n        <td>There are {{orders?.length || 0}} orders</td>\n        <td><button class=\"btn btn-sm btn-info btn-block\" \n                    routerLink=\"/admin/orders\">Manage Orders</button></td>\n    </tr>\n</table>\n"

/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = "<table *ngIf=\"tableMode; else create\" class=\"table table-sm table-striped\">\n    <tr>\n        <th>ID</th><th>Name</th><th>Category</th><th>Supplier</th>\n        <th>Price</th><th></th>\n    </tr>\n    <tr *ngFor=\"let p of products\">\n        <ng-template [ngIf]=\"product?.productId != p.productId\" [ngIfElse]=\"edit\">\n            <td>{{p.productId}}</td>\n            <td>{{p.name}}</td>\n            <td>{{p.category}}</td>\n            <td>{{p.supplier?.name || '(None)'}}</td>\n            <td>{{p.price | currency:USD:true}}</td>\n            <td>\n                <button class=\"btn btn-sm btn-primary\"\n                        (click)=\"selectProduct(p.productId)\">Edit</button>\n                <button class=\"btn btn-sm btn-danger\"\n                        (click)=\"deleteProduct(p.productId)\">Delete</button>\n            </td>\n        </ng-template>\n    </tr>\n    <tfoot>\n        <tr>\n            <td colspan=\"6\" class=\"text-center\">\n                <button class=\"btn btn-primary\"\n                    (click)=\"clearProduct(); tableMode = false\">Create</button>\n            </td>\n        </tr>\n    </tfoot>\n</table>\n\n<ng-template #edit>\n    <td colspan=\"6\">\n        <admin-product-editor></admin-product-editor>\n        <div class=\"text-center\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"saveProduct()\">\n                Save\n            </button>\n            <button class=\"btn btn-sm btn-info\" (click)=\"clearProduct()\">\n                Cancel\n            </button>\n        </div>\n    </td>\n</ng-template>\n\n<ng-template #create>\n    <admin-product-editor></admin-product-editor>\n    <button class=\"btn btn-primary\" (click)=\"saveProduct()\">\n        Save\n    </button>\n    <button class=\"btn btn-info\" (click)=\"clearProduct()\">\n        Cancel\n    </button>\n</ng-template>\n"

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\">\n    <label>Name</label>\n    <input class=\"form-control\" [(ngModel)]=\"product.name\" />\n</div>\n<div class=\"form-group\">\n    <label>Category</label>\n    <input class=\"form-control\" [(ngModel)]=\"product.category\" />\n</div>\n<div class=\"form-group\">\n    <label>Supplier</label>\n    <select class=\"form-control\" [(ngModel)]=\"product.supplier\"\n            [compareWith]=\"compareSuppliers\">\n        <option *ngFor=\"let s of suppliers\" [ngValue]=\"s\">{{s.name}}</option>\n    </select>\n</div>\n<div class=\"form-group\">\n    <label>Description</label>\n    <textarea class=\"form-control\" [(ngModel)]=\"product.description\"></textarea>\n</div>\n<div class=\"form-group\">\n    <label>Price</label>\n    <input class=\"form-control\" [(ngModel)]=\"product.price\" />\n</div>\n"

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg-danger text-white text-center p-2 m-2\" *ngIf=\"error != null\">\n    <h6 *ngFor=\"let e of error\">{{e}}</h6>\n    <button class=\"btn btn-warning\" (click)=\"clearError()\">OK</button>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-info mb-1\">\n    <a class=\"navbar-brand text-white\">SPORTS STORE Admin</a>\n</div>\n\n<h4 *ngIf=\"showError\" class=\"p-2 bg-danger text-white\">\n    Invalid username or password\n</h4>\n\n<form novalidate #authForm=\"ngForm\">\n    <div class=\"form-group\">\n        <label>Name:</label>\n        <input #name=\"ngModel\" name=\"name\" class=\"form-control\"\n               [(ngModel)]=\"authService.name\" required />\n        <div *ngIf=\"name.invalid\" class=\"text-danger\">\n            Please enter your user name\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Password:</label>\n        <input type=\"password\" #password=\"ngModel\" name=\"password\" \n               class=\"form-control\" [(ngModel)]=\"authService.password\" required />\n        <div *ngIf=\"password.invalid\" class=\"text-danger\">\n            Please enter your password\n        </div>\n    </div>    \n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-primary\" [disabled]=\"authForm.invalid\"\n                (click)=\"login()\">Login</button>\n    </div>\n</form>\n"

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<div class=\"m-1\">\n    <h2 class=\"text-center\">Your Cart</h2>\n    <table class=\"table table-bordered table-striped p-1\">\n        <thead>\n            <tr>\n                <th>Quantity</th><th>Product</th>\n                <th class=\"text-right\">Price</th>\n                <th class=\"text-right\">Subtotal</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngIf=\"cart.selections.length == 0\">\n                <td colspan=\"4\" class=\"text-xs-center\">\n                    Your cart is empty\n                </td>\n            </tr>\n            <tr *ngFor=\"let sel of cart.selections\">\n                <td>\n                    <input type=\"number\" class=\"form-control-sm\"\n                           style=\"width:5em\" [(ngModel)]=\"sel.quantity\" />\n                </td>\n                <td>{{sel.name}}</td>\n                <td class=\"text-right\">\n                    {{sel.price | currency:\"USD\":true:\"2.2-2\"}}\n                </td>\n                <td class=\"text-right\">\n                    {{(sel.quantity * sel.price) | currency:\"USD\":true:\"2.2-2\" }}\n                </td>\n                <td class=\"text-center\">\n                    <button class=\"btn btn-sm btn-danger\"\n                            (click)=\"cart.updateQuantity(sel.productId, 0)\">\n                        Remove\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n        <tfoot>\n            <tr>\n                <td colspan=\"3\" class=\"text-right\">Total:</td>\n                <td class=\"text-right\">\n                    {{cart.totalPrice | currency:\"USD\":true:\"2.2-2\"}}\n                </td>\n            </tr>\n        </tfoot>\n    </table>\n</div>\n<div class=\"text-center\">\n    <button class=\"btn btn-primary\" routerLink=\"/store\">Continue Shopping</button>\n    <button class=\"btn btn-secondary\" routerLink=\"/checkout\"\n            [disabled]=\"cart.selections.length == 0\">\n        Checkout\n    </button>\n</div>\n"

/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-right p-1\">\n    <small *ngIf=\"itemCount > 0; else empty\">\n        ({{ itemCount }} item(s) {{ totalPrice | currency:\"USD\":true }})\n    </small>\n    <button class=\"btn btn-sm ml-1\" \n            [disabled]=\"itemCount == 0\"\n            routerLink=\"/cart\">\n        <i class=\"fa fa-shopping-cart\"></i>\n    </button>\n</div>\n\n<ng-template #empty>\n    <small class=\"text-muted\">\n        (cart is empty)\n    </small>\n</ng-template>\n"

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = "<div class=\"m-1\">\n    <button class=\"btn btn-outline-primary btn-block\"\n            (click)=\"setCurrentCategory(null)\">\n        All Categories\n    </button>\n    <button *ngFor=\"let category of categories\" \n            class=\"btn btn-outline-primary btn-block\"\n            [class.active]=\"currentCategory == category\"\n            (click)=\"setCurrentCategory(category)\">\n        {{category}}\n    </button>\n</div>\n"

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<h2 class=\"text-center mt-1\">Step 1: Your Details</h2>\n\n<form novalidate #detailsForm=\"ngForm\">\n    <div class=\"form-group\">\n        <label>Name</label>\n        <input #name=\"ngModel\" name=\"name\" class=\"form-control\"\n               [(ngModel)]=\"order.name\" required />\n        <div *ngIf=\"name.invalid\" class=\"text-danger\">\n            Please enter your name\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Address</label>\n        <input #address=\"ngModel\" name=\"street\" class=\"form-control\"\n               [(ngModel)]=\"order.address\" required />\n        <div *ngIf=\"address.invalid\" class=\"text-danger\">\n            Please enter your address\n        </div>\n    </div>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/cart\">Back</button>\n        <button class=\"btn btn-danger\" [disabled]=\"detailsForm.invalid\"\n                routerLink=\"/checkout/step2\">\n            Next\n        </button>\n    </div>\n</form>\n"

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">\n    <a class=\"navbar-brand text-white\">SPORTS STORE</a>\n</div>\n\n<h2 class=\"text-center mt-1\">Step 2: Payment</h2>\n\n<form novalidate #paymentForm=\"ngForm\">\n    <div class=\"form-group\">\n        <label>Card Number</label>\n        <input #cardNumber=\"ngModel\" name=\"cardNumber\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardNumber\" required />\n        <div *ngIf=\"cardNumber.invalid\" class=\"text-danger\">\n            Please enter your card number\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Card Expiry</label>\n        <input #cardExpiry=\"ngModel\" name=\"cardExpiry\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardExpiry\" required />\n        <div *ngIf=\"cardExpiry.invalid\" class=\"text-danger\">\n            Please enter your card expiry\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Security Code</label>\n        <input #cardCode=\"ngModel\" name=\"cardCode\" class=\"form-control\"\n               [(ngModel)]=\"order.payment.cardSecurityCode\" required />\n        <div *ngIf=\"cardCode.invalid\" class=\"text-danger\">\n            Please enter your security code\n        </div>\n    </div>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step1\">\n            Back\n        </button>\n        <button class=\"btn btn-danger\" [disabled]=\"paymentForm.invalid\"\n                routerLink=\"/checkout/step3\">Next</button>\n    </div>\n</form>\n"

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Summary</h2>\n\n<div class=\"container\">\n    <table class=\"table m-2\">\n        <tr><th>Name</th><td>{{order.name}}</td></tr>\n        <tr><th>Address</th><td>{{order.address}}</td></tr>\n        <tr><th>Products</th><td>{{order.cart.itemCount}}</td></tr>\n        <tr>\n            <th>Total Price</th>\n            <td>{{order.cart.totalPrice | currency:USD:true }}</td>\n        </tr>\n    </table>\n    <div class=\"text-center pt-2\">\n        <button class=\"btn btn-outline-primary\" routerLink=\"/checkout/step2\">\n            Back\n        </button>\n        <button class=\"btn btn-danger\" (click)=\"submitOrder()\">\n            Place Order\n        </button>\n    </div>\n</div>\n"

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"text-center\">Order Confirmation</h2>\n\n<div class=\"container\">\n    <table *ngIf=\"order.orderConfirmation; else nodata\" class=\"table m-2\">\n        <tr><th>Order</th><td>{{order.orderConfirmation.orderId}}</td></tr>\n        <tr><th>Price</th><td>{{order.orderConfirmation.amount}}</td></tr>\n        <tr><th>Payment Code</th><td>{{order.orderConfirmation.authCode}}</td></tr>\n    </table>\n    <div class=\"text-center\">\n        <button class=\"btn btn-primary\" routerLink=\"/\">Done</button>\n    </div>\n\n    <ng-template #nodata>\n        <h3 class=\"text-center\">Submitting Order...</h3>\n    </ng-template>\n</div>\n"

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"pages.length > 1\" class=\"text-right my-2\">\n    <button *ngFor=\"let page of pages\" \n            class=\"btn btn-outline-primary mx-1\"\n            [class.active]=\"current == page\"\n            (click)=\"changePage(page)\">\n        {{page}}\n    </button>\n</div>\n"

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"products?.length > 0; else nodata\">\n    <div *ngFor=\"let product of products\" class=\"card card-outline-primary m-1\">\n        <div class=\"card-header\">\n            <span class=\"h4\">\n                {{product.name}}\n                <store-ratings [product]=\"product\"></store-ratings> \n            </span>\n            <span class=\"float-right badge badge-pill badge-primary\">\n                {{product.price  | currency:\"USD\":true }}\n            </span>\n        </div>\n        <div class=\"card-block\">\n            <span class=\"card-text p-a-1\">{{product.description}}</span>\n            <button class=\"float-right btn btn-sm btn-success\"\n                    (click)=\"addToCart(product)\">\n                Add to Cart\n            </button>\n        </div>\n    </div>\n</div>\n\n<ng-template #nodata>\n    <h4 class=\"m-1\">Waiting for data...</h4>\n</ng-template>\n"

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar bg-inverse \">    \n    <div class=\"row\">\n        <div class=\"col\">\n            <a class=\"navbar-brand text-white\">\n                SPORTS STORE\n            </a>\n        </div>\n        <div class=\"col text-white mr-1\">\n            <store-cartsummary></store-cartsummary>\n        </div>\n    </div>\n</div>\n<div class=\"row no-gutters\">\n    <div class=\"col-3\">\n        <store-categoryfilter></store-categoryfilter>\n    </div>\n    <div class=\"col\">\n        <store-product-list></store-product-list>\n        <store-pagination></store-pagination>\n    </div>\n</div>\n"

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = "<span class=\"h6 ml-1\">\n    <i *ngFor=\"let s of stars\"\n        [class]=\"s ? 'fa fa-star' : 'fa fa-star-o'\"\n        [style.color]=\"s ? 'goldenrod' : 'gray'\">\n    </i>     \n</span>\n"

/***/ }),
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(105);


/***/ })
],[231]);
//# sourceMappingURL=main.bundle.js.map