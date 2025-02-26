import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() selectedCategory!: string;

  selectedSubCategory: any = null;
  selectedSubSubCategory: string = '';

  categories = [
    {
      name: 'Artificial Intelligence (AI)',
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
      name: 'Machine Learning (ML)',
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

  onSubCategoryChange(event: Event) {
    const selectedSubCategoryName = (event.target as HTMLSelectElement).value;
    this.selectedSubCategory =
      this.getCategoryDetails()?.subCategories.find(
        (subCategory) => subCategory.name === selectedSubCategoryName
      ) || null;
    this.selectedSubSubCategory = '';
  }

  onSubSubCategoryChange(event: Event) {
    this.selectedSubSubCategory = (event.target as HTMLSelectElement).value;
  }

  toggleSubSubCategoryVisibility(subCategory: any) {
    if (this.selectedSubCategory === subCategory) {
      this.selectedSubCategory = null;
    } else {
      this.selectedSubCategory = subCategory;
    }
  }
}
