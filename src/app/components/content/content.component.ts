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
      <div class="content-container">
  <h1>Natural Language Processing (NLP)</h1>

  <p class="intro-text">
    Natural Language Processing (NLP) is a field of artificial intelligence that enables computers to understand, interpret, and generate human language.
    It involves various techniques for processing and analyzing large amounts of natural language data.
  </p>

  <h2 class="section-title">Applications of NLP</h2>
  <ul class="applications-list">
    <li>Sentiment Analysis</li>
    <li>Chatbots and Virtual Assistants</li>
    <li>Text Classification</li>
    <li>Machine Translation</li>
    <li>Speech Recognition</li>
    <li>Information Extraction</li>
  </ul>

  <h2 class="section-title">How NLP Works</h2>
  <p class="description">
    NLP works by using algorithms that can understand the structure of sentences, the meaning of words in context, and the relationships between words.
    This is typically achieved by processing text data with techniques like tokenization, lemmatization, part-of-speech tagging, and dependency parsing.
  </p>
</div>

<!-- Embedded CSS -->
<style>
  .content-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .content-container h1 {
    font-size: 24px;
    color: #333;
  }

  .intro-text {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
  }

  .section-title {
    font-size: 20px;
    color: #333;
    margin-top: 20px;
  }

  .applications-list {
    list-style-type: square;
    padding-left: 20px;
    color: #333;
  }

  .description {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-top: 10px;
  }
</style>

    `;
  }
  
}
