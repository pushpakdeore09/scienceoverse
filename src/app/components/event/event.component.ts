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

  email: string = 'dirghayurami52@gmail.com';
  currentUser: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.checkUserLogin();  
  }

  checkUserLogin(): void {
    const storedUserData = Object.keys(localStorage).find(key => localStorage.getItem(key));

    if (storedUserData) {
      this.currentUser = storedUserData;
      console.log(`User found in localStorage: ${this.currentUser}`);
    } else {
      this.login(this.email);
    }
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

  login(email: string): void {
    this.eventService.login(email).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        const username = response.username;
        this.currentUser = username;

        const userData = {
          username: username,
          likedPosts: [] 
        };

        localStorage.setItem(username, JSON.stringify(userData));
        console.log('User data stored in localStorage:', userData);
      },
      error: (error) => {
        console.error('Error logging in:', error);
      }
    });
  }

  isLiked(event: Event): boolean {
    const userData = this.getUserData();
    return userData.likedPosts.includes(event.name); 
  }

  toggleLike(event: Event): void {
    const userData = this.getUserData();

    const index = userData.likedPosts.indexOf(event.name);

    if (index === -1) {
      userData.likedPosts.push(event.name);
    } else {
      userData.likedPosts.splice(index, 1);
    }

    this.updateUserData(userData);
    console.log('Updated likedPosts:', userData.likedPosts);
  }

  getUserData(): any {
    const userData = JSON.parse(localStorage.getItem(this.currentUser) || '{}');
    return userData;
  }

  updateUserData(userData: any): void {
    localStorage.setItem(this.currentUser, JSON.stringify(userData));
  }
}
