import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Supplier } from "./supplier.model";
import { Filter, Pagination } from "./configClasses.repository";
import { Order } from "./order.model";
import { ErrorHandlerService, ValidationError } from "../errorHandler.service";
import "rxjs/add/operator/catch";

const productsUrl = "/api/products";
const suppliersUrl = "/api/suppliers";
const ordersUrl = "/api/orders";

@Injectable()
export class Repository {
    private filterObject = new Filter();
    private paginationObject = new Pagination();

    constructor(private http: Http) {
        //this.filter.category = "soccer";
        this.filter.related = true;
        this.getProducts();
    }

    getProduct(id: number) {
        this.sendRequest(RequestMethod.Get, productsUrl + "/" + id)
            .subscribe(response => this.product = response);
    }

    getProducts() {
        let url = productsUrl + "?related=" + this.filter.related;

        if (this.filter.category) {
            url += "&category=" + this.filter.category;
        }
        if (this.filter.search) {
            url += "&search=" + this.filter.search;
        }

        url += "&metadata=true";
        this.sendRequest(RequestMethod.Get, url)
            .subscribe(response => {
                this.products = response.data;
                this.categories = response.categories;
                this.pagination.currentPage = 1;
            });
    }

    getSuppliers() {
        this.sendRequest(RequestMethod.Get, suppliersUrl)
            .subscribe(response => this.suppliers = response);
    }

    createProduct(prod: Product) {
        let data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };

        this.sendRequest(RequestMethod.Post, productsUrl, data)
            .subscribe(response => {
                prod.productId = response;
                this.products.push(prod);
            });
    }

    createProductAndSupplier(prod: Product, supp: Supplier) {
        let data = {
            name: supp.name, city: supp.city, state: supp.state
        };

        this.sendRequest(RequestMethod.Post, suppliersUrl, data)
            .subscribe(response => {
                supp.supplierId = response;
                prod.supplier = supp;
                this.suppliers.push(supp);
                if (prod != null) {
                    this.createProduct(prod);
                }
            });
    }

    replaceProduct(prod: Product) {
        let data = {
            name: prod.name, category: prod.category,
            description: prod.description, price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };
        this.sendRequest(RequestMethod.Put, productsUrl + "/" + prod.productId, data)
            .subscribe(response => this.getProducts());
    }

    replaceSupplier(supp: Supplier) {
        let data = {
            name: supp.name, city: supp.city, state: supp.state
        };
        this.sendRequest(RequestMethod.Put,
            suppliersUrl + "/" + supp.supplierId, data)
            .subscribe(response => this.getProducts());
    }

    updateProduct(id: number, changes: Map<string, any>) {
        let patch = [];
        changes.forEach((value, key) =>
            patch.push({ op: "replace", path: key, value: value }));

        this.sendRequest(RequestMethod.Patch, productsUrl + "/" + id, patch)
            .subscribe(response => this.getProducts());
    }

    private sendRequest(verb: RequestMethod, url: string, data?: any)
        : Observable<any> {

        return this.http.request(new Request({
            method: verb, url: url, body: data
        }))
            .map(response => {
                return response.headers.get("Content-Length") != "0"
                    ? response.json() : null;
            })
            .catch((errorResponse: Response) => {
                if (errorResponse.status == 400) {
                    let jsonData: string;
                    try {
                        jsonData = errorResponse.json();
                    } catch (e) {
                        throw new Error("Network Error");
                    }
                    let messages = Object.getOwnPropertyNames(jsonData)
                        .map(p => jsonData[p]);
                    throw new ValidationError(messages);
                }
                throw new Error("Network Error");
            });
    }


    deleteProduct(id: number) {
        this.sendRequest(RequestMethod.Delete, productsUrl + "/" + id)
            .subscribe(response => this.getProducts());
    }

    deleteSupplier(id: number) {
        this.sendRequest(RequestMethod.Delete, suppliersUrl + "/" + id)
            .subscribe(response => {
                this.getProducts();
                this.getSuppliers();
            });
    }



    get filter(): Filter {
        return this.filterObject;
    }

    get pagination(): Pagination {
        return this.paginationObject;
    }

    storeSessionData(dataType: string, data: any) {
        return this.sendRequest(RequestMethod.Post, "/api/session/" + dataType, data)
            .subscribe(response => { });
    }

    getSessionData(dataType: string): Observable<any> {
        return this.sendRequest(RequestMethod.Get, "/api/session/" + dataType);
    }

    getOrders() {
        this.sendRequest(RequestMethod.Get, ordersUrl)
            .subscribe(data => this.orders = data);
    }

    createOrder(order: Order) {
        this.sendRequest(RequestMethod.Post, ordersUrl, {
            name: order.name,
            address: order.address,
            payment: order.payment,
            products: order.products
        }).subscribe(data => {
            order.orderConfirmation = data
            order.cart.clear();
            order.clear();
        });
    }

    shipOrder(order: Order) {
        this.sendRequest(RequestMethod.Post, ordersUrl + "/" + order.orderId)
            .subscribe(r => this.getOrders())
    }

    login(name: string, password: string): Observable<Response> {
        return this.http.post("/api/account/login",
            { name: name, password: password });
    }

    logout() {
        this.http.post("/api/account/logout", null).subscribe(respone => { });
    }

    product: Product;
    products: Product[];
    suppliers: Supplier[] = [];
    categories: string[] = [];
    orders: Order[] = [];

}
