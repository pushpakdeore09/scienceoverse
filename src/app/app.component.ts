import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedSubSubCategory: string = '';

  onCategorySelect(category: any) {
    this.selectedCategory = category;
    this.selectedSubCategory = '';
    this.selectedSubSubCategory = '';
  }
  
  onSubCategorySelected(subCategory: any) {
    this.selectedSubCategory = subCategory;
    this.selectedSubSubCategory = '';
  }
  
  onSubSubCategorySelected(subSubCategory: any) {
    this.selectedSubSubCategory = subSubCategory;
  }
  
}
