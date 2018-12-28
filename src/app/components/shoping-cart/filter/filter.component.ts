import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  constructor(private _ProductsService: ProductsService)
  { }

  ngOnInit() {


  }

  /*getProducts*/
  getProducts(): void {
    this._ProductsService.getProducts().subscribe(products => {
      this._ProductsService.productsService = products;
    })

  }
  /*filterByPrice*/
  filterByPrice(){
    this.getProducts();
    var range1 = (<HTMLInputElement>document.getElementById("range1")).value;
    var range2 = (<HTMLInputElement>document.getElementById("range2")).value;
    if(Number(range1) >=0 && Number(range2) >=0){
      this._ProductsService.productsService= this._ProductsService.productsService.filter(item => Number(item.price.replace("$","").replace(",","")) >= Number(range1)).filter(item => Number(item.price.replace("$","").replace(",","")) <= Number(range2));
    }
  }

  /*filterByAvailable*/
  filterByAvailable(){
    this.getProducts();
    var available_true  = (<HTMLInputElement>document.getElementById("Si")).checked;
    var available_false = (<HTMLInputElement>document.getElementById("No")).checked;
    if(available_true){
      this._ProductsService.productsService= this._ProductsService.productsService.filter(item => item.available == available_true);
    }else if(available_false){
      console.log(available_false);
      this._ProductsService.productsService= this._ProductsService.productsService.filter(item => item.available == false);
    }
 }
  /*filterByQuantity*/
  filterByQuantity(){
    this.getProducts();
    var quantity = (<HTMLInputElement>document.getElementById("quantity")).value;
    console.log(quantity);
    if(Number(quantity) >0){
      this._ProductsService.productsService= this._ProductsService.productsService.filter(item => Number(item.quantity) === Number(quantity));
      console.log(this._ProductsService.productsService);
    }

  }


}
