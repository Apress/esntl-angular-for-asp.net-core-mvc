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
//# sourceMappingURL=configClasses.repository.js.map