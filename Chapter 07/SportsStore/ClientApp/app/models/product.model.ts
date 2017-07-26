import { Supplier } from "./supplier.model";
import { Rating } from "./rating.model";

export class Product {
    constructor(
        public productId?: number,
        public name?: string,
        public category?: string,
        public description?: string,
        public price?: number,
        public supplier?: Supplier,
        public ratings?: Rating[] ) { }
}
