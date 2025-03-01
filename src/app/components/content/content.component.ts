import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentService } from '../../service/content/content.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnChanges {
  @Input() selectedSubCategory!: any;
  @Input() selectedSubSubCategory!: string;
  content: string = '';

  constructor(private contentService: ContentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSubCategory'] || changes['selectedSubSubCategory']) {
      const subCategory = changes['selectedSubCategory']?.currentValue || 'No SubCategory Selected';
      console.log("subcategory: " + subCategory);
      
      this.loadContent(); 
    }
  }

  loadContent() {
    const subCategoryName = this.selectedSubCategory ? this.selectedSubCategory.name : 'No SubCategory Selected';
    const subSubCategoryName = this.selectedSubSubCategory ? this.selectedSubSubCategory : 'No SubSubCategory Selected';
  
    this.content = `
      <div>
        <h2>Selected Sub-Category:</h2>
        <p>${subCategoryName}</p>
        <h2>Selected Sub-Sub-Category:</h2>
        <p>${subSubCategoryName}</p>
      </div>
    `;
  }
  
}
