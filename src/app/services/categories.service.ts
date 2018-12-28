import { Injectable } from '@angular/core';
import { Category } from '../components/categories/categories';
import { CATEGORIES } from '../components/categories/categories.mock';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories(): Observable<Category[]> {

    return of(CATEGORIES);
  }

}
