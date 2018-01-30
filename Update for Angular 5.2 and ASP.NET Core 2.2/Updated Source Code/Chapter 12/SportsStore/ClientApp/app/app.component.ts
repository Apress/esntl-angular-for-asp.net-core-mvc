import { Component, NgZone } from '@angular/core';
import { ErrorHandlerService } from "./errorHandler.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private lastError: string[];

    constructor(errorHandler: ErrorHandlerService, ngZone: NgZone) {
        errorHandler.errors.subscribe(error => {
            ngZone.run(() => this.lastError = error);
        });
    }

    get error(): string[] {
        return this.lastError;
    }

    clearError() {
        this.lastError = null;
    }
}