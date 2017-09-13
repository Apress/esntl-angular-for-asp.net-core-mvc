import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ModelModule } from "./models/model.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpModule, ModelModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
