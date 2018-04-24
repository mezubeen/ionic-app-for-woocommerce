import { CartPage } from './../cart/cart';
import { LoginPage } from './../login/login';
import { SignupPage } from './../signup/signup';
import { ProductsByCategoryPage } from './../products-by-category/products-by-category';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WooInitProvider } from '../../providers/woo-init/woo-init';
import  { Storage }  from "@ionic/storage";




@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  woocommerce: any;
  categories = [];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;

  constructor(
    public navCtrl: NavController, 
    private WP: WooInitProvider, 
    public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController) {

    this.homePage = HomePage
    this.categories = [];
    this.user = {};

    this.woocommerce = this.WP.init();

    this.woocommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++) {

        //creating an icon name for categories which is ion icon name
        if (temp[i].slug == "clothing"){
          temp[i].icon = "shirt";
        }
        if (temp[i].slug == "music"){
          temp[i].icon = "musical-notes";
        }
        if (temp[i].slug == "posters"){
          temp[i].icon = "images";
        }

          if (temp[i].parent == 0 && temp[i].name !== 'Uncategorized') {
            this.categories.push(temp[i]);
          }
      }

    }, (err) => {
      console.log(err);
    })
  };

  ionViewDidEnter() {
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo != null){

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {
      "category" : category
    });
  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push(SignupPage);
    }
    if(pageName == "login"){
      this.navCtrl.push(LoginPage);
    }
    if(pageName == 'logout'){
      this.storage.remove("userLoginInfo").then( () => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if(pageName == 'cart'){
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }

  }

}
