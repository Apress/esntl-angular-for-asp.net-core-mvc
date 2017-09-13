"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
//import { ProductTableComponent } from "./structure/productTable.component"
//import { ProductDetailComponent } from "./structure/productDetail.component";
var productSelection_component_1 = require("./store/productSelection.component");
var routes = [
    { path: "store", component: productSelection_component_1.ProductSelectionComponent },
    { path: "", component: productSelection_component_1.ProductSelectionComponent }
];
exports.RoutingConfig = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map