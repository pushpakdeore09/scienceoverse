import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  selectedCategoryValue: string = '';
  isClosed = false;

  categories = [
    'Artificial Intelligence (AI)',
    'Machine Learning (ML)',
    'Robotics',
    'Aerospace',
    'Astronomy',
    'Drone Technology',
    'Aerodynamics',
    'Propulsion',
    'Avionics',
  ];

  selectCategory(category: string) {
    this.selectedCategoryValue = category;
    this.selectedCategory.emit(category); 
  }

  toggleNavbar() {
    this.isClosed = !this.isClosed; 
  }
}
