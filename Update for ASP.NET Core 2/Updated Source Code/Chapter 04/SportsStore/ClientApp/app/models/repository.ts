import { Product } from "./product.model";

export class Repository {

    constructor() {
        this.product = JSON.parse(document.getElementById("data").textContent);
    }

    product: Product;
}
