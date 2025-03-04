import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }
  
  addResource(resource: Resource) {
    return this.http.post(this.url + '/add-resource', resource);
  }

  getCategoryResources(category: string): Observable<Resource[]>{
    return this.http.get<Resource[]>(`${this.url}/get-resource-by-name/${category}`);
  }

  getSubCategoryResources(subCategory: string): Observable<Resource[]>{
    return this.http.get<Resource[]>(`${this.url}/get-resource-by-name/${subCategory}`);
  }

  getSubSubCategoryResources(subSubCategory: string): Observable<Resource[]>{
    return this.http.get<Resource[]>(`${this.url}/get-resource-by-name/${subSubCategory}`);
  }
  
}
