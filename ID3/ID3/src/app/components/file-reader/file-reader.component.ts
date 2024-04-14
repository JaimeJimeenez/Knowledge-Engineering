import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'id3-file-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss']
})
export class FileReaderComponent {
  @Input() title : string = '';
  @Input() isExamples : boolean = false;
  @Output() contentEmitter = new EventEmitter<{ content : string[][] | string[], isExamples : boolean }>();

  constructor() {}

  private _content : string[][] | string[] = [];

  private _getContent(content : string) : string[] | string[][] {
    if (this.isExamples) {
      const text = content.split('\n');
      const textSplitted = text.map(example => example.split(','));
      textSplitted.forEach((text, index) => {
        text.forEach((element, index) => {
          if (index === text.length - 1 && element.length === 3)
            text[index] = text[index].slice(0, element.length - 1)
        });
      });
      return textSplitted;
    }
    return content.split(',');
  }

  onFileSelected(event : any) : void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this._content = this._getContent(fileContent);
        this.contentEmitter.emit({ content : this._content, isExamples: this.isExamples });
      };
      reader.readAsText(selectedFile);
    }

  }
}
