import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ModelModule } from "./models/model.module";
import { ProductTableComponent } from "./structure/productTable.component"
import { CategoryFilterComponent } from "./structure/categoryFilter.component"
import { ProductDetailComponent } from "./structure/productDetail.component";
import { RoutingConfig } from "./app.routing";

@NgModule({
    declarations: [AppComponent, ProductTableComponent,
        CategoryFilterComponent, ProductDetailComponent],
    imports: [BrowserModule, FormsModule, HttpModule, ModelModule, RoutingConfig],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
