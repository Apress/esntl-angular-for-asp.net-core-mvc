"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var admin_component_1 = require("./admin.component");
var overview_component_1 = require("./overview.component");
var productAdmin_component_1 = require("./productAdmin.component");
var orderAdmin_component_1 = require("./orderAdmin.component");
var productEditor_component_1 = require("./productEditor.component");
var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule, forms_1.FormsModule],
        declarations: [admin_component_1.AdminComponent, overview_component_1.OverviewComponent,
            productAdmin_component_1.ProductAdminComponent, orderAdmin_component_1.OrderAdminComponent, productEditor_component_1.ProductEditorComponent]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map