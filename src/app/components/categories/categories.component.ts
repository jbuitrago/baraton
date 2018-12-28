import { Component, OnInit } from '@angular/core';
import { Category } from './categories';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  constructor(private _CategoriesService: CategoriesService,private _ProductsService: ProductsService) { }

  ngOnInit() {
    this.getCategories();
  }
  /*getCategories*/
  getCategories(): void {
    this._CategoriesService.getCategories().subscribe(categories =>
    {


      return this.categories = categories;

    });
  }
  /*getProducts*/
  getProducts(): void {
    this._ProductsService.getProducts().subscribe(products => {
    this._ProductsService.productsService = products;
    });
  }
  /*filterByCategory*/
  filterByCategory(sublevel_id): void{
    this.getProducts();
    if(sublevel_id>0){
      this._ProductsService.productsService= this._ProductsService.productsService.filter(item =>  item.sublevel_id == sublevel_id);
    }

  }

  /*filterByName*/
  filterByName(event,sublevel_id){
    if(event.keyCode == 13) {
      this.getProducts();
      var re = new RegExp(event.target.value.toUpperCase(), 'g');
      if(event.target.value!="" && sublevel_id>0){
        this._ProductsService.productsService= this._ProductsService.productsService.filter(item =>  item.sublevel_id == sublevel_id).filter(item =>  item.name.toUpperCase().match(re));
      }else {
        if (event.target.value != "") {
          this._ProductsService.productsService = this._ProductsService.productsService.filter(item => item.name.toUpperCase().match(re));
        } else if(sublevel_id>0) {
          this._ProductsService.productsService= this._ProductsService.productsService.filter(item =>  item.sublevel_id == sublevel_id);
        }
      }
    }

  }

}

