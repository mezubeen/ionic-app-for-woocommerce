import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import  { Storage }  from "@ionic/storage";




@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[]= [];
  total: any;
  showEmptyCartMessage:boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public view: ViewController) {
      this.total = 0.0;

      this.storage.ready().then( ()=> {
         this.storage.get("cart").then( (data)=> {
           this.cartItems = data;
           console.log(this.cartItems);

           if (this.cartItems.length > 0) {
            this.cartItems.forEach( (Item, index) => {
              this.total = this.total + (Item.product.price*Item.qty)
            });
          } else {
            this.showEmptyCartMessage = true;
          }
           
         })
      })
  }

  removeFromCart(item, i){
    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i,1);
    this.storage.set("cart", this.cartItems).then( ()=> {
      this.total = this.total - (price * qty);
    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
  }

  closeModal(){
    this.view.dismiss();
  }



}
