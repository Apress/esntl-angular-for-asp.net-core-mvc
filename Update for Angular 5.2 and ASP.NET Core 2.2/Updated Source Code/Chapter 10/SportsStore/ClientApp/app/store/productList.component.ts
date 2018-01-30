import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";

@Component({
    selector: "store-product-list",
    templateUrl: "productList.component.html"
})
export class ProductListComponent {

    constructor(private repo: Repository, private cart: Cart) { }

    get products(): Product[] {
        if (this.repo.products != null && this.repo.products.length > 0) {
            let pageIndex = (this.repo.pagination.currentPage - 1)
                * this.repo.pagination.productsPerPage;
            return this.repo.products.slice(pageIndex,
                pageIndex + this.repo.pagination.productsPerPage);
        }
    }

    addToCart(product: Product) {
        this.cart.addProduct(product);
    }
}
