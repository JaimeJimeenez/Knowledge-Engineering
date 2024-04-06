import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPosition } from 'src/app/interface/iPosition';

@Component({
  selector: 'astar-input-obstacles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-obstacles.component.html',
  styleUrls: ['./input-obstacles.component.scss']
})
export class InputObstaclesComponent {
  @Input() rowsBoard : number = 5;
  @Input() columnsBoard : number = 5;
  @Output() obstaclesBoard = new EventEmitter<IPosition>();
  obstaclesForm : FormGroup;
  showError : boolean = false;

  constructor() {
    this.obstaclesForm = new FormGroup({
      x : new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')]),
      y : new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')])
    });
  }

  private _positionsOutOfBoard(x : number, y : number) : boolean {
    return x > this.rowsBoard || y > this.columnsBoard || x <= 0 || y <= 0;
  }

  onSubmit() : void {
    const { x, y } = this.obstaclesForm.value;
    if (this._positionsOutOfBoard(x, y)) {
      this.showError = true;
    }
    else {
      this.showError = false;
      this.obstaclesBoard.emit({ x : +x, y: +y });
    }
  }
}
