export class NodeBoard {
  position: [number, number];
  father: NodeBoard | null;
  g: number;
  h: number;
  f: number;
  danger : boolean = false;

  constructor(position: [number, number], father: NodeBoard | null = null, danger = false) {
      this.position = position;
      this.father = father;
      this.g = 0;
      this.h = 0;
      this.f = 0;
      if (this.danger)
        this.f = 1;
  }

  equals(other: NodeBoard): boolean {
      return this.position[0] === other.position[0] && this.position[1] === other.position[1];
  }

  toString(): string {
      return `Position: ${this.position}, Father: ${this.father}, g: ${this.g}, h: ${this.h}, f: ${this.f}`;
  }
}
