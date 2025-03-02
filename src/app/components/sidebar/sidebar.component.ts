import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentService } from '../../service/content/content.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() selectedCategory!: string;
  @Output() selectedSubCategory: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() selectedSubSubCategory: EventEmitter<string> =
    new EventEmitter<string>();
  selectedSubCategoryValue: any = '';
  selectedSubSubCategoryValue: any = '';

  categories = [
    {
      name: 'Artificial Intelligence',
      subCategories: [
        {
          name: 'Natural Language Processing',
          subSubCategories: ['Speech Recognition', 'Text Analytics'],
        },
        {
          name: 'Computer Vision',
          subSubCategories: ['Image Processing', 'Object Detection'],
        },
        { name: 'AI Ethics', subSubCategories: ['Bias', 'Privacy'] },
      ],
    },
    {
      name: 'Machine Learning',
      subCategories: [
        {
          name: 'Supervised Learning',
          subSubCategories: ['Classification', 'Regression'],
        },
        {
          name: 'Unsupervised Learning',
          subSubCategories: ['Clustering', 'Dimensionality Reduction'],
        },
      ],
    },
    {
      name: 'Robotics',
      subCategories: [
        {
          name: 'Industrial Robots',
          subSubCategories: ['Manufacturing', 'Assembly'],
        },
        {
          name: 'Autonomous Robots',
          subSubCategories: ['Self-driving Cars', 'Drones'],
        },
      ],
    },
  ];

  getCategoryDetails() {
    return this.categories.find(
      (category) => category.name === this.selectedCategory
    );
  }

  onSubCategoryChange(subCategory: any) {
    this.selectedSubCategoryValue = subCategory;
    this.selectedSubCategory.emit(subCategory.name); 
    this.selectedSubSubCategoryValue = '';
  }
  
  onSubSubCategoryChange(subSubCategory: string) {
    this.selectedSubSubCategoryValue = subSubCategory;
    this.selectedSubSubCategory.emit(subSubCategory); 
  }
  

  toggleSubSubCategoryVisibility(subCategory: any) {
    if (this.selectedSubCategoryValue === subCategory) {
      this.selectedSubCategoryValue = null;
    } else {
      this.selectedSubCategoryValue = subCategory;
      this.selectedSubCategory.emit(subCategory)
    }
  }
}