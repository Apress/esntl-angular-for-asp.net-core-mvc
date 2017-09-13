import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

@Component({
    templateUrl: "overview.component.html"
})
export class OverviewComponent {

    constructor(private repo: Repository) { }

    get products(): Product[] {
        return this.repo.products;
    }

    get orders(): Order[] {
        return this.repo.orders;
    }
}
