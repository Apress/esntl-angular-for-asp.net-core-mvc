import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationComponent } from "./authentication.component";
import { AuthenticationGuard } from "./authentication.guard";

@NgModule({
    imports: [RouterModule, FormsModule, BrowserModule],
    declarations: [AuthenticationComponent],
    providers: [AuthenticationService, AuthenticationGuard],
    exports: [AuthenticationComponent]
})
export class AuthModule { }
