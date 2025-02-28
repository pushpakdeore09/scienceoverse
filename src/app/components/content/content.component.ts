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
  @Input() selectedSubSubCategory!: any;
  content: string = '';

  constructor(private contentService: ContentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedSubCategory || this.selectedSubSubCategory) {
      this.loadContent();
    }
  }

  loadContent() {
    let filepath = '';
    console.log('loading content');
    
    if (this.selectedSubCategory && !this.selectedSubSubCategory) {
      filepath = `${this.selectedSubCategory.name.toLowerCase().replace(/\s/g, '')}`;
    } else if (this.selectedSubCategory && this.selectedSubSubCategory) {
      filepath = `${this.selectedSubSubCategory.toLowerCase().replace(/\s/g, '')}`;
    }
  
    if (filepath) {
      console.log(filepath);
      
      this.contentService.getHtmlContent(filepath).then((htmlContent) => {
        this.content = htmlContent; 
      });
    }
  }
  
}
