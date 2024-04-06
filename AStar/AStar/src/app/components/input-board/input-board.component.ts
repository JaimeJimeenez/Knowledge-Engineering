import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'astar-input-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-board.component.html',
  styleUrls: ['./input-board.component.scss']
})
export class InputBoardComponent {
  boardForm : FormGroup;
  @Output() settingsBoard = new EventEmitter<{ rows : number, columns : number }>();

  constructor() {
    this.boardForm = new FormGroup({
      rows: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      columns: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    })
  }

  onSubmit() : void {
    const { rows, columns } = this.boardForm.value;
    this.settingsBoard.emit({ rows, columns });
  }
}
