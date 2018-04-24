import { ProductDetailsPage } from './../product-details/product-details';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { WooInitProvider } from '../../providers/woo-init/woo-init';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  woocommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(
    public navCtrl: NavController,
    private WP: WooInitProvider,
    public toastCtrl: ToastController) {

    this.page = 2;


    this.woocommerce = this.WP.init();

    this.loadMoreProducts(null);

    this.woocommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err);
    });

  }

  ionViewDidLoad() {
    setInterval(() => {

      if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event) {

    if (event == null) {
      this.page = 2;
      this.moreProducts = [];
    } else
      this.page++;


    this.woocommerce.getAsync("products?page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if (event != null) {
        event.complete();
      }


      if (JSON.parse(data.body).products.length < 10) {
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();
      }

    }, (err) => {
      console.log(err);
    });
  }

  openProductPage(product) {
    this.navCtrl.push(ProductDetailsPage, {
      "product": product
    })
  }

}
