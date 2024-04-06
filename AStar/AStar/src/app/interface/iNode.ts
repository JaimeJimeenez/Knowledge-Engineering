import { IPosition } from "./iPosition";

export interface INode {
  position : IPosition,
  isInit : boolean,
  isTarget : boolean,
  isPath : boolean,
  isObstacle : boolean,
  isDangerous : boolean
};
