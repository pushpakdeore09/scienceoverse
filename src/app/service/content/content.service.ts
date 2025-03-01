import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }
  
  addResource(resource: any) {
    return this.http.post(this.url + '/add-resource', { resource });
  }
  
}
