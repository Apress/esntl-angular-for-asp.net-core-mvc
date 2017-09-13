import { Injectable } from "@angular/core";
import { Repository } from "../models/repository";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import "rxjs/add/observable/of";

@Injectable()
export class AuthenticationService {

    constructor(private repo: Repository,
        private router: Router) { }

    authenticated: boolean = false;
    name: string;
    password: string;
    callbackUrl: string;

    login(): Observable<boolean> {
        this.authenticated = false;
        return this.repo.login(this.name, this.password)
            .map(response => {
                if (response.ok) {
                    this.authenticated = true;
                    this.password = null;
                    this.router.navigateByUrl(this.callbackUrl || "/admin/overview");
                }
                return this.authenticated;
            })
            .catch(e => {
                this.authenticated = false;
                return Observable.of(false);
            });

    }

    logout() {
        this.authenticated = false;
        this.repo.logout();
        this.router.navigateByUrl("/login");
    }
}
