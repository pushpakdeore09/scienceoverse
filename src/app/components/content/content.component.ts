import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentService } from '../../service/content.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnChanges {
  @Input() selectedSubCategory!: any;
  @Input() selectedSubSubCategory!: string;
  content: string = '';

  constructor(private contentService: ContentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedSubCategory || this.selectedSubSubCategory) {
    }
  }

  loadContent() {
    let filepath = '';
  
    if (this.selectedSubCategory && !this.selectedSubSubCategory) {
      filepath = `${this.selectedSubCategory.name.toLowerCase().replace(/\s/g, '')}`;
    } else if (this.selectedSubCategory && this.selectedSubSubCategory) {
      filepath = `${this.selectedSubCategory.name.toLowerCase().replace(/\s/g, '')}/${this.selectedSubSubCategory.toLowerCase().replace(/\s/g, '')}`;
    }
  
    if (filepath) {
      this.contentService.getHtmlContent(filepath).then((htmlContent) => {
        this.content = htmlContent; 
      });
    }
  }
  
}
