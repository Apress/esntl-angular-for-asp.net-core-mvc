"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var productSelection_component_1 = require("./store/productSelection.component");
var cartDetail_component_1 = require("./store/cartDetail.component");
var checkoutDetails_component_1 = require("./store/checkout/checkoutDetails.component");
var checkoutPayment_component_1 = require("./store/checkout/checkoutPayment.component");
var checkoutSummary_component_1 = require("./store/checkout/checkoutSummary.component");
var orderConfirmation_component_1 = require("./store/checkout/orderConfirmation.component");
var admin_component_1 = require("./admin/admin.component");
var overview_component_1 = require("./admin/overview.component");
var productAdmin_component_1 = require("./admin/productAdmin.component");
var orderAdmin_component_1 = require("./admin/orderAdmin.component");
var authentication_guard_1 = require("./auth/authentication.guard");
var authentication_component_1 = require("./auth/authentication.component");
var routes = [
    { path: "login", component: authentication_component_1.AuthenticationComponent },
    { path: "admin", redirectTo: "/admin/overview", pathMatch: "full" },
    {
        path: "admin", component: admin_component_1.AdminComponent,
        canActivateChild: [authentication_guard_1.AuthenticationGuard],
        children: [
            { path: "products", component: productAdmin_component_1.ProductAdminComponent, },
            { path: "orders", component: orderAdmin_component_1.OrderAdminComponent },
            { path: "overview", component: overview_component_1.OverviewComponent },
            { path: "", component: overview_component_1.OverviewComponent }
        ]
    },
    { path: "checkout/step1", component: checkoutDetails_component_1.CheckoutDetailsComponent },
    { path: "checkout/step2", component: checkoutPayment_component_1.CheckoutPaymentComponent },
    { path: "checkout/step3", component: checkoutSummary_component_1.CheckoutSummaryComponent },
    { path: "checkout/confirmation", component: orderConfirmation_component_1.OrderConfirmationComponent },
    { path: "checkout", component: checkoutDetails_component_1.CheckoutDetailsComponent },
    { path: "cart", component: cartDetail_component_1.CartDetailComponent },
    { path: "store", component: productSelection_component_1.ProductSelectionComponent },
    { path: "", component: productSelection_component_1.ProductSelectionComponent }
];
exports.RoutingConfig = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map