"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Filter = Filter;
var Pagination = (function () {
    function Pagination() {
        this.productsPerPage = 4;
        this.currentPage = 1;
    }
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=configClasses.repository.js.map