import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ModelModule } from "./models/model.module";
//import { ProductTableComponent } from "./structure/productTable.component"
//import { CategoryFilterComponent } from "./structure/categoryFilter.component"
//import { ProductDetailComponent } from "./structure/productDetail.component";
import { RoutingConfig } from "./app.routing";
import { StoreModule } from "./store/store.module";
import { ProductSelectionComponent } from "./store/productSelection.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpModule, ModelModule,
        RoutingConfig, StoreModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
