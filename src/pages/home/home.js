var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as WC from "woocommerce-api";
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.page = 2;
        this.woocommerce = WC({
            url: "http://localhost/wordpress/",
            consumerKey: "ck_324f2b8f4b1f69d29d0e0d8e6df8c5b13213c605",
            consumerSecret: "cs_2b5a9143dfe97c4763885a0936744bda556522f5"
        });
        this.loadMoreProducts(null);
        this.woocommerce.getAsync("products").then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setInterval(function () {
            if (_this.productSlides.getActiveIndex() == _this.productSlides.length() - 1)
                _this.productSlides.slideTo(0);
            _this.productSlides.slideNext();
        }, 3000);
    };
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        console.log(event);
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        }
        else
            this.page++;
        this.woocommerce.getAsync("products?page=" + this.page).then(function (data) {
            console.log(JSON.parse(data.body));
            _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body).products);
            if (event = null) {
                event.complete();
            }
            // if(JSON.parse(data.body).products.length < 10){
            //   event.enable(false);
            // }
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        ViewChild('productSlides'),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "productSlides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map