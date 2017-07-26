import { Component } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "product-detail",
    templateUrl: "productDetail.component.html"
})
export class ProductDetailComponent {

    constructor(private repo: Repository,
                router: Router,
                activeRoute: ActivatedRoute) {

        let id = Number.parseInt(activeRoute.snapshot.params["id"]);
        if (id) {
            this.repo.getProduct(id);
        } else {
            router.navigateByUrl("/");
        }
    }

    get product(): Product {
        return this.repo.product;
    }
}
