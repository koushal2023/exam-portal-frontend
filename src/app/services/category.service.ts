import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // create category
  public createCategory(category: any) {
    return this.http.post(`${baseUrl}/category/`, category);
  }
  // update category
  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/category/`, category);
  }
  // get all categories
  public getAllCategories() {
    return this.http.get(`${baseUrl}/category/`);
  }
  // get category by id
  public getCategoryById(id: any) {
    return this.http.get(`${baseUrl}/category/${id}`);
  }
  // delete category
  public deleteCategory(id: any) {
    return this.http.delete(`${baseUrl}/category/${id}`);
  }
}
