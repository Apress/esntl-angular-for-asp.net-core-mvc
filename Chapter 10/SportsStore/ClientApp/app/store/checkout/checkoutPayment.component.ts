import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "../../models/order.model";

@Component({
    templateUrl: "checkoutPayment.component.html"
})
export class CheckoutPaymentComponent {

    constructor(private router: Router,
                public order: Order) {
        if (order.name == null || order.address == null) {
            router.navigateByUrl("/checkout/step1");
        }
    }
}
