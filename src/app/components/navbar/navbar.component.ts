import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  @Output() resetSubCategory: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetSubSubCategory: EventEmitter<void> = new EventEmitter<void>();
  selectedCategoryValue: string = '';
  isClosed = false;

  visibleCategories: string[] = [];
  startIndex: number = 0;  
  maxVisibleItems: number = 9;  

  categories = [
    'Artificial Intelligence',
    'Machine Learning',
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
    this.selectCategory(this.visibleCategories[0]);  
  }


  updateVisibleCategories() {
    this.visibleCategories = this.categories.slice(this.startIndex, this.startIndex + this.maxVisibleItems);
  }

  selectCategory(category: string) {
    this.selectedCategoryValue = category;
    this.selectedCategory.emit(category);
    this.resetSubCategory.emit();
    this.resetSubSubCategory.emit();
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
