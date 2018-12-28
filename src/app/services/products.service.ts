import { Injectable } from '@angular/core';
import { Product } from '../components/products/products';
import { PRODUCTS } from '../components/products/products.mock';
import { Observable, of } from 'rxjs'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsService :Product[];

  cart: any =[];

  constructor(private _cookieService: CookieService) { }

  getProducts(): Observable<Product[]> {

    return of(PRODUCTS);
  }


}
