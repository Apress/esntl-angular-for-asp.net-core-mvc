import { Routes, RouterModule } from "@angular/router";
import { ProductTableComponent } from "./structure/productTable.component"
import { ProductDetailComponent } from "./structure/productDetail.component";

const routes: Routes = [
    { path: "table", component: ProductTableComponent },
    { path: "detail/:id", component: ProductDetailComponent },
    { path: "detail", component: ProductDetailComponent },
    { path: "", component: ProductTableComponent }]

export const RoutingConfig = RouterModule.forRoot(routes);
