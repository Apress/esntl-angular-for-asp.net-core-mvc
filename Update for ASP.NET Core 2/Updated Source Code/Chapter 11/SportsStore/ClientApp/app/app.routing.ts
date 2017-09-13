import { Routes, RouterModule } from "@angular/router";
import { ProductSelectionComponent } from "./store/productSelection.component";
import { CartDetailComponent } from "./store/cartDetail.component";
import { CheckoutDetailsComponent }
    from "./store/checkout/checkoutDetails.component";
import { CheckoutPaymentComponent }
    from "./store/checkout/checkoutPayment.component";
import { CheckoutSummaryComponent }
    from "./store/checkout/checkoutSummary.component";
import { OrderConfirmationComponent }
    from "./store/checkout/orderConfirmation.component";
import { AdminComponent } from "./admin/admin.component";
import { OverviewComponent } from "./admin/overview.component";
import { ProductAdminComponent } from "./admin/productAdmin.component";
import { OrderAdminComponent } from "./admin/orderAdmin.component";

import { AuthenticationGuard } from "./auth/authentication.guard";
import { AuthenticationComponent } from "./auth/authentication.component";

const routes: Routes = [
    { path: "login", component: AuthenticationComponent },
    { path: "admin", redirectTo: "/admin/overview", pathMatch: "full" },
    {
        path: "admin", component: AdminComponent,
        canActivateChild: [AuthenticationGuard],
        children: [
            { path: "products", component: ProductAdminComponent, },
            { path: "orders", component: OrderAdminComponent },
            { path: "overview", component: OverviewComponent },
            { path: "", component: OverviewComponent }
        ]
    },
    { path: "checkout/step1", component: CheckoutDetailsComponent },
    { path: "checkout/step2", component: CheckoutPaymentComponent },
    { path: "checkout/step3", component: CheckoutSummaryComponent },
    { path: "checkout/confirmation", component: OrderConfirmationComponent },
    { path: "checkout", component: CheckoutDetailsComponent },
    { path: "cart", component: CartDetailComponent },
    { path: "store", component: ProductSelectionComponent },
    { path: "", component: ProductSelectionComponent }]

export const RoutingConfig = RouterModule.forRoot(routes);
