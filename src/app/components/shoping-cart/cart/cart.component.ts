import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/products';
import { ProductsService } from '../../../services/products.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private _ProductsService: ProductsService , private _cookieService: CookieService) {

  }

  ngOnInit() {

    /* Valido si la cookie existe*/
    if(this._cookieService.check('cookieCart')) {
       this._ProductsService.cart = JSON.parse(this._cookieService.get('cookieCart'));
    }

  }
  delete(product): void {

    this._ProductsService.cart = this._ProductsService.cart.filter(cart => {

      return cart.name.trim().toUpperCase() != product.name.trim().toUpperCase()

    });
    /*Actualizo la cookie */
    this._cookieService.set( 'cookieCart', JSON.stringify(this._ProductsService.cart) );

    console.log(JSON.parse(this._cookieService.get('cookieCart')));

  }

  calcSuma(product){

    var quantity = Number((<HTMLInputElement>document.getElementById("quantity_"+product.id)).value);
    var totalItem_ = (<HTMLInputElement>document.getElementById("totalItem_"+product.id));
    var price = Number(product.price.replace("$","").replace(",",""));
    var toTalFinal = "$" + (price * quantity);
    var total = (<HTMLInputElement>document.getElementById("total"));
    totalItem_.value = toTalFinal;
    this._cookieService.set( 'cookieCart', JSON.stringify(this._ProductsService.cart) );

  }

  pagar(){

    this._cookieService.deleteAll();
    alert('Gracias por su compra');
    location.href="/";
  }
}
