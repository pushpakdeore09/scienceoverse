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
    this.updateVisibleCategories();  // Initialize the categories to display
  }

  // Update the list of visible categories based on the current start index and max visible items
  updateVisibleCategories() {
    this.visibleCategories = this.categories.slice(this.startIndex, this.startIndex + this.maxVisibleItems);
  }

  // Function to handle category selection
  selectCategory(category: string) {
    this.selectedCategoryValue = category;
    this.selectedCategory.emit(category);
  }

  // Toggle function for the navbar (for collapsing or expanding)
  toggleNavbar() {
    this.isClosed = !this.isClosed; 
  }

  // Go to the next set of categories when the right arrow is clicked
  showNextCategories() {
    if (this.startIndex + this.maxVisibleItems < this.categories.length) {
      this.startIndex += this.maxVisibleItems;
      this.updateVisibleCategories();
    }
  }

  // Go to the previous set of categories when the left arrow is clicked
  showPreviousCategories() {
    if (this.startIndex > 0) {
      this.startIndex -= this.maxVisibleItems;
      this.updateVisibleCategories();
    }
  }
}
