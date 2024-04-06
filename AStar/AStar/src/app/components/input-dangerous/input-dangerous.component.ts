import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'astar-input-dangerous',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-dangerous.component.html',
  styleUrls: ['./input-dangerous.component.scss']
})
export class InputDangerousComponent {
  dangerousForm : FormGroup;
  showError : boolean = false;
  @Input() rowsBoard : number = 5;
  @Input() columnsBoard : number = 5;
  @Output() dangerousBoard = new EventEmitter<{ x: number, y : number}>();

  constructor() {
    this.dangerousForm = new FormGroup({
      x : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      y : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
  }

  private _positionsOutOfBoard(x : number, y : number) : boolean {
    return x > this.rowsBoard || y > this.columnsBoard || x <= 0 || y <= 0;
  }

  onSubmit() : void {
    const { x, y } = this.dangerousForm.value;
    if (this._positionsOutOfBoard(x, y)) {
      this.showError = true;
    }
    else {
      this.showError = false;
      this.dangerousBoard.emit({ x : +x, y: +y });
    }
  }
}
