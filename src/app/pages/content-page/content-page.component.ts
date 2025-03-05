import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ContentComponent } from '../../components/content/content.component';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ContentComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {


  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedSubSubCategory: string = '';
  resourceData: Resource | null = null;

  onCategorySelect(category: any) {
    this.selectedCategory = category;
    this.selectedSubCategory = '';
    this.selectedSubSubCategory = '';
  }
  
  onSubCategorySelected(subCategory: any) {
    this.selectedSubCategory = subCategory;
    this.selectedSubSubCategory = '';
    console.log(subCategory);
    
  }
  
  onSubSubCategorySelected(subSubCategory: any) {
    this.selectedSubSubCategory = subSubCategory;
  }

  
}
