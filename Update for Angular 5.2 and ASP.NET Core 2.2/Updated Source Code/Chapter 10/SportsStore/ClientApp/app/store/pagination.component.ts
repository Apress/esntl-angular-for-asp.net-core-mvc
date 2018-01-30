import { Component } from "@angular/core";
import { Repository } from "../models/repository";

@Component({
    selector: "store-pagination",
    templateUrl: "pagination.component.html"
})
export class PaginationComponent {

    constructor(private repo: Repository) { }

    get current(): number {
        return this.repo.pagination.currentPage;
    }

    get pages(): number[] {
        if (this.repo.products != null) {
            return Array(Math.ceil(this.repo.products.length
                / this.repo.pagination.productsPerPage))
                .fill(0).map((x, i) => i + 1);
        } else {
            return [];
        }
    }

    changePage(newPage: number) {
        this.repo.pagination.currentPage = newPage;
    }
}
