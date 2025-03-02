import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  events = [
    {
      image: 'https://via.placeholder.com/400x200', 
      date: 'Mar 15',  
      text: 'Exciting webinar on technology innovations!'
    },
    {
      image: 'https://via.placeholder.com/400x200', 
      date: 'Mar 20',
      text: 'Join our online tech competition!'
    },
    {
      image: 'https://via.placeholder.com/400x200', 
      date: 'Mar 25',
      text: 'Free coding workshop on data science.'
    },
    {
      image: 'https://via.placeholder.com/400x200', 
      date: 'Mar 30',
      text: 'Digital marketing training session.'
    }
  ];
}
