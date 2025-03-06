import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.url + "/get-all-events");
  }

  addEvent(event: Event): Observable<any>{
    return this.http.post(this.url + "/add-event", event);
  }

  updateEvent(event: Event){
    this.http.put(this.url + "/update-event", event);
  }
}
