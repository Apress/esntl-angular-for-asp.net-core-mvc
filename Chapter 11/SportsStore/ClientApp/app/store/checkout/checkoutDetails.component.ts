import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "../../models/order.model";

@Component({
    templateUrl: "checkoutDetails.component.html"
})
export class CheckoutDetailsComponent {

    constructor(private router: Router,
                public order: Order) {
        if (order.products.length == 0) {
            this.router.navigateByUrl("/cart");
        }            
    }
}
