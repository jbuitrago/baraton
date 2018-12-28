import { Component, OnInit } from '@angular/core';
import { Product } from './products';
import { ProductsService } from '../../services/products.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  cookieValue = 'UNKNOWN';

  constructor(private _ProductsService: ProductsService , private _cookieService: CookieService ) {
  }

  ngOnInit() {
    this.getProducts();

  }

  getProducts(): void {
    this._ProductsService.getProducts().subscribe(product => {
      this._ProductsService.productsService = product;
    });
  }


  /* OrderBy*/
  OrderBy(Item,arrow){
    var Item = Item;
    var arrow = arrow;

    function compare(a, b ) {
      var itemA , itemB;

      if(Item=="price"){

         itemA = Number(a.price.replace("$","").replace(",",""));
         itemB = Number(b.price.replace("$","").replace(",",""));

      }else if(Item=="quantity") {
         itemA = Number(a.quantity);
         itemB = Number(b.quantity);
      }else if(Item=="available") {
         itemA = a.available;
         itemB = b.available;
      }else{
         itemA = Number(a.name.replace("$","").replace(",",""));
         itemB = Number(b.name.replace("$","").replace(",",""));
      }

      let comparison = 0;
      if (itemA > itemB) {
        comparison = 1;
      } else if (itemA < itemB) {
        comparison = -1;
      }
      return comparison;
    }
    if(arrow=="up"){
      this._ProductsService.productsService.sort(compare).reverse();
    }else if(arrow=="down"){
      this._ProductsService.productsService.sort(compare);
    }

  }

  add(product): void {



    var productArr = [];
    productArr.push(product);

   // productArr.map(item => item.quantity=1);
    // productArr.map(item => item.price=Number(item.price.replace("$","").replace(",","")));
    this._ProductsService.cart.push(product);
    this._cookieService.set( 'cookieCart', JSON.stringify(this._ProductsService.cart) );

    console.log(JSON.parse(this._cookieService.get('cookieCart')));

  }


}

