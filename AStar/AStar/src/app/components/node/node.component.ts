import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INode } from 'src/app/interface/iNode';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  selector: 'astar-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() node : INode = {
    position: {
      x: 0,
      y: 0
    },
    isInit: false,
    isTarget: false,
    isPath: false,
    isObstacle : false,
    isDangerous : false
  };

}
