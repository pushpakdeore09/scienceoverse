import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }
  
  getHtmlContent(filepath: string): Promise<string> {
    console.log('Loading content:', filepath);
    
    return fetch(`/content/${filepath}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('File not found');
        }
        return response.text();
      })
      .catch((error) => {
        console.error('Error loading file:', error);
        return '<p>Content not found</p>'; 
      });
  }
  
}
