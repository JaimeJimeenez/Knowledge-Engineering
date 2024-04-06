import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPosition } from 'src/app/interface/iPosition';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'astar-input-position',
  templateUrl: './input-position.component.html',
  styleUrls: ['./input-position.component.scss']
})
export class InputPositionComponent {
  @Input() rowsBoard : number = 5;
  @Input() columnsBoard : number = 5;
  @Output() positionsBoard = new EventEmitter<{ init_position : IPosition, end_position : IPosition }>();
  positionsForm : FormGroup;
  showError : boolean = false;

  constructor() {
    this.positionsForm = new FormGroup({
      initial_x: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')]),
      initial_y: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')]),
      target_x: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')]),
      target_y : new FormControl('', [Validators.required,  Validators.pattern('^[0-9]+$')]),
    })
  }

  private _positionsOutOfBoard(initial_x : number, initial_y : number, target_x : number, target_y : number) : boolean {
    return initial_x > this.rowsBoard || target_x > this.rowsBoard || target_y > this.columnsBoard || initial_y > this.columnsBoard;
  }

  onSubmit() : void {
    const { initial_x, initial_y, target_x, target_y } = this.positionsForm.value;
    if (this._positionsOutOfBoard(initial_x, initial_y, target_x, target_y))
      this.showError = true;
    else {
      const init_position = { x: +initial_x, y : +initial_y };
      const end_position = { x : +target_x, y : +target_y };
      this.showError = false;
      this.positionsBoard.emit({ init_position, end_position })
    }
  }
}
