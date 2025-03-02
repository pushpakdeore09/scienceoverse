import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EventComponent } from '../../components/event/event.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [HeaderComponent, EventComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

}
