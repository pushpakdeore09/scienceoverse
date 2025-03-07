import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showPopup = false;
  constructor() {}

  ngOnInit(){
    this.checkViewPortSize();
  }

  checkViewPortSize(){
    if(window.innerWidth < 768){
      this.showPopup = true;
    }
  }

  closePopup(){
    this.showPopup = false;
  }
  
}
