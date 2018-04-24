import { Injectable } from '@angular/core';
import * as WC from "woocommerce-api";


@Injectable()
export class WooInitProvider {
  woocommerce: any;

  constructor() {
    //         this.woocommerce = WC({
    //   url: "https://zubstore-babar4u.c9users.io/",
    //   consumerKey: "ck_2f14516895cbc62c4f9ceaab7a2e55dcb1dd7fcb",
    //   consumerSecret: "cs_1d64cf92c25be3c957a4a88f7a7cc72eccc1b3a9"
    // });

    this.woocommerce = WC({
      url: "http://localhost/",
      consumerKey: "ck_a04b3558c7810da3364e57910ab978b4a10bbd32",
      consumerSecret: "cs_33550c606f0bc1f913791cb60ea78fcdeb1c6b93"
    });
  }

  init(){
    return this.woocommerce;
  }

}
