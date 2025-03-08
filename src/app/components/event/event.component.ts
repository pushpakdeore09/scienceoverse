import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventService } from '../../service/event/event.service';
import { Event } from '../../models/event.model';

type EventCategory = 'upcoming' | 'completed' | 'career';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent {
  events: Event[] = [];
  displayShareButton: boolean = true;
  visibleCards: number = 4;

  currentIndex: Record<EventCategory, number> = {
    upcoming: 0,
    completed: 0,
    career: 0,
  };
  visibleEvents: Record<EventCategory, Event[]> = {
    upcoming: [],
    completed: [],
    career: [],
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        this.events = events;
        console.log('Events fetched successfully:', this.events);
        this.updateVisibleEvents('upcoming');
        this.updateVisibleEvents('completed');
        this.updateVisibleEvents('career');
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
    });
  }

  updateVisibleEvents(category: EventCategory): void {
    const filteredEvents = this.events.filter(
      (event) => event.type === category
    );
    this.visibleEvents[category] = filteredEvents.slice(
      this.currentIndex[category],
      this.currentIndex[category] + this.visibleCards
    );
  }

  nextSlide(category: EventCategory): void {
    const filteredEvents = this.events.filter(
      (event) => event.type === category
    );
    if (
      this.currentIndex[category] + this.visibleCards <
      filteredEvents.length
    ) {
      this.currentIndex[category]++;
      this.updateVisibleEvents(category);
    }
  }

  prevSlide(category: EventCategory): void {
    if (this.currentIndex[category] > 0) {
      this.currentIndex[category]--;
      this.updateVisibleEvents(category);
    }
  }
}
