import { Component, Input } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { CommonModule } from '@angular/common';
import { AStar } from 'src/app/lib/astar';
import { InputBoardComponent } from '../input-board/input-board.component';
import { InputPositionComponent } from '../input-position/input-position.component';
import { INode } from 'src/app/interface/iNode';
import { IPosition } from 'src/app/interface/iPosition';
import { InputObstaclesComponent } from '../input-obstacles/input-obstacles.component';
import { InputDangerousComponent } from '../input-dangerous/input-dangerous.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputBoardComponent,
    InputPositionComponent,
    NodeComponent,
    InputObstaclesComponent,
    InputDangerousComponent
  ],
  selector: 'astar-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  _rows : number = 5;
  _columns : number = 6;

  counterRows : any[] = [];
  counterColumns : any[] = [];
  nodes : INode[][] = [];
  obstacles : [number, number][] = [];
  paths : IPosition[] = [];
  wayspoints : [number, number][] = [];
  dangerous : [number, number][] = [];

  private _initPosition : IPosition = {
    x : 0,
    y : 0,
  };
  private _endPosition : IPosition = {
    x : 0,
    y : 0
  }

  constructor() {
    this._formatBoard();
  }

  private _formatBoard() : void {
    this.nodes = [];
    for (let i = 0; i < this._rows; i++){
      const nodesRows : INode[] = [];
      for (let j = 0; j < this._columns; j++) {
        const node : INode = {
          position: {
            x: i + 1,
            y: j + 1
          },
          isInit: false,
          isTarget: false,
          isPath: false,
          isObstacle: false,
          isDangerous: false
        };
        nodesRows.push(node);
        if (j === this._columns - 1)
          this.nodes.push(nodesRows);
      }
    }
  }

  onSettingsBoard(event : any) : void {
    const { rows, columns } = event;
    this._rows = rows;
    this._columns = columns;
    this._formatBoard();
  }

  private _checkPositions(actualPosition : IPosition, position : IPosition) : boolean {
    return actualPosition.x === position.x && actualPosition.y === position.y;
  }

  private _modifyPositions(init_position : IPosition, end_position : IPosition) : void {
    for (let nodesList of this.nodes) {
      const indexInit = nodesList.findIndex(node => this._checkPositions(node.position, init_position));
      const indexEnd = nodesList.findIndex(node => this._checkPositions(node.position, end_position));
      if (indexInit !== -1)
        nodesList[indexInit].isInit = true;
      if (indexEnd !== -1)
        nodesList[indexEnd].isTarget = true;
      if (indexEnd !== -1 && indexInit !== -1)
        return;
    }
  }

  resetBoard() : void {
    this._formatBoard();
  }

  onPositionsBoard(event : any) : void {
    const { init_position, end_position } = event;
    this._initPosition = init_position;
    this._endPosition = end_position
    this._modifyPositions(init_position, end_position);
  }

  onObstaclesBoard($event : any) : void {
    const { x, y } = $event;
    this.obstacles.push([x, y]);
    console.log(this.obstacles);
    const position : IPosition = { x, y };
    console.log(position);
    this._calculateObstacles(position);
  }

  private _calculateObstacles(position : IPosition) : void {
    for (let nodeList of this.nodes) {
      const index = nodeList.findIndex(node => this._checkPositions(node.position, position));
      if (index !== -1 && !nodeList[index].isInit && !nodeList[index].isTarget) {
        nodeList[index].isObstacle = true;
        return;
      }
    }
  }

  private _formatPath() : void {
    for (let nodesList of this.nodes)
      nodesList.forEach(node => node.isPath = false);
  }

  private _calculatePath() : void {
    this._formatPath();
    for (let position of this.paths) {
      for (let nodesList of this.nodes) {
        const index = nodesList.findIndex(node => this._checkPositions(node.position, position));
        if (index !== -1 && !nodesList[index].isInit && !nodesList[index].isTarget) {
          nodesList[index].isPath = true;
          break;
        }
      }
    }
  }

  private _parsePath(astar : [number, number][]) : IPosition[] {
    const path : IPosition[] = [];
    astar.forEach((position : [number, number]) => {
      path.push({
        x: position[0],
        y: position[1]
      })
    })
    return path;
  }

  private _calculateDangerous(position : IPosition) : void {
    for (let nodeList of this.nodes) {
      const index = nodeList.findIndex(node => this._checkPositions(node.position, position));
      if (index !== -1 && !nodeList[index].isInit && !nodeList[index].isTarget) {
        nodeList[index].isDangerous = true;
        return;
      }
    }
  }

  onDangerousBoard(event : any) : void {
    const { x, y } = event;
    this.dangerous.push([x, y]);
    this._calculateDangerous({ x, y })
  }

  resolveBoard() : void {
    const astar = AStar.main(
      this._rows,
      this._columns,
      [this._initPosition.x, this._initPosition.y],
      [this._endPosition.x, this._endPosition.y],
      this.obstacles,
      this.dangerous
    );
    this.paths = this._parsePath(astar);
    console.log(this.paths);
    this._calculatePath();
  }
}
