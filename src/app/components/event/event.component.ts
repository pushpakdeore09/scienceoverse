import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventService } from '../../service/event/event.service';
import {Event} from '../../models/event.model';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  constructor (private eventService: EventService) {}

  events: Event[] = [];
  eventsData: Event | null = null;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        this.events = events;  
        console.log('Events fetched successfully:', this.events);

      },
      error: (error) => {
        console.error('Error fetching events:', error);  
      },
      complete: () => {
        console.log('Event fetching completed.');
      }
    });
  }
}
