import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ContentService } from '../../service/content/content.service';
import { ContentComponent } from '../content/content.component';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() selectedCategory!: string;
  @Input() selectedSubCategory!: string;
  @Output() selectedSubCategoryChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() selectedSubSubCategoryChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() resourceData: Resource | null = null;
  @Input() subResourceData: Resource | null = null;
  selectedSubCategoryValue: any = '';
  selectedSubSubCategoryValue: any = '';

  constructor(private contentService: ContentService) {}

  

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedCategory) {
      this.getCategoryDetails();
    }

    if (this.selectedSubCategory) {
      this.getSubCategoryDetails();
    }
  }

  getCategoryDetails() {
    
    this.contentService
      .getCategoryResources(this.selectedCategory)
      .subscribe((data: Resource[]) => {
        this.resourceData = data.length ? data[0] : null;
      });
  }

  getSubCategoryDetails() {

    this.contentService
      .getSubCategoryResources(this.selectedSubCategory)
      .subscribe((data: Resource[]) => {
        this.subResourceData = data.length ? data[0] : null;
        console.log(this.subResourceData);
      });
  }

  onSubCategoryChange(subCategory: any) {
    console.log(subCategory);
    
    this.selectedSubCategoryValue = subCategory;
    this.selectedSubCategoryChange.emit(subCategory);
    this.selectedSubSubCategoryValue = '';
  }

  onSubSubCategoryChange(subSubCategory: string) {
    this.selectedSubSubCategoryValue = subSubCategory;
    this.selectedSubSubCategoryChange.emit(subSubCategory);
  }

  toggleSubSubCategoryVisibility(subCategory: any) {
    if (this.selectedSubCategoryValue === subCategory) {
      this.selectedSubCategoryValue = null;
    } else {
      this.selectedSubCategoryValue = subCategory;
      this.selectedSubCategoryChange.emit(subCategory);
    }
  }

  updateResourceData(resourceData: Resource) {
    this.resourceData = resourceData;
  }
}
