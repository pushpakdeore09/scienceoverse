import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  selectedCategoryValue: string = '';
  isClosed = false;

  visibleCategories: string[] = [];
  startIndex: number = 0;  
  maxVisibleItems: number = 9;  

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
    'Space Exploration',
    'Space Missions',
    'Spacecraft',
    'Satellites',
  ];

  ngOnInit() {
    this.updateVisibleCategories();  
  }


  updateVisibleCategories() {
    this.visibleCategories = this.categories.slice(this.startIndex, this.startIndex + this.maxVisibleItems);
  }

  selectCategory(category: string) {
    this.selectedCategoryValue = category;
    this.selectedCategory.emit(category);
  }

  toggleNavbar() {
    this.isClosed = !this.isClosed; 
  }

  showNextCategories() {
    if (this.startIndex + this.maxVisibleItems < this.categories.length) {
      this.startIndex += this.maxVisibleItems;
      this.updateVisibleCategories();
    }
  }

  showPreviousCategories() {
    if (this.startIndex > 0) {
      this.startIndex -= this.maxVisibleItems;
      this.updateVisibleCategories();
    }
  }
}
