import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentService } from '../../service/content/content.service';
import { CommonModule } from '@angular/common';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnChanges {
  @Input() selectedCategory: string = '';
  @Input() selectedSubCategory: any = null;
  @Input() selectedSubSubCategory: string = '';
  content: string = '';
  resources: Resource[] = [];
  resourceData: Resource | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    if(this.selectedCategory){
      this.loadCategoryResources();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes and update content accordingly
    if (this.selectedSubSubCategory) {
      this.loadSubSubCategoryResources();
    } else if (this.selectedSubCategory) {
      this.loadSubCategoryResources();
    } else if (this.selectedCategory) {
      this.loadCategoryResources();
    }
  }

  loadCategoryResources() {
    if (this.selectedCategory) {
      this.contentService
        .getCategoryResources(this.selectedCategory)
        .subscribe((resources: Resource[]) => {
          this.resources = resources;
          this.resourceData =
            this.resources.find(
              (resource) => resource.resource === this.selectedCategory
            ) ?? null;

          this.loadContent();
        });
    }
  }

  loadSubCategoryResources() {
    if (this.selectedSubCategory) {
      this.contentService
        .getSubCategoryResources(this.selectedSubCategory.name)
        .subscribe((resources: Resource[]) => {
          this.resources = resources;
          this.resourceData =
            this.resources.find(
              (resource) => resource.resource === this.selectedSubCategory.name
            ) ?? null;

          this.loadContent();
        });
    }
  }

  loadSubSubCategoryResources() {
    if (this.selectedSubSubCategory) {
      this.contentService
        .getSubSubCategoryResources(this.selectedSubSubCategory)
        .subscribe((resources: Resource[]) => {
          this.resources = resources;
          this.resourceData =
            this.resources.find(
              (resource) => resource.resource === this.selectedSubSubCategory
            ) ?? null;
          this.loadContent();
        });
    }
  }

  loadContent() {
    if (this.resourceData) {
      this.content = this.resourceData.description;
    } else {
      this.content = '<h1>No Content Available</h1>';
    }
  }
}
