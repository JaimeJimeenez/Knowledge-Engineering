import { NodeBoard } from "./node";

export class AStar {
    static calculateCost(node: NodeBoard, dangerousNodes: [number, number][]): void {
        if (dangerousNodes.some(dangerousNode => node.position[0] === dangerousNode[0] && node.position[1] === dangerousNode[1])) {
            node.f = node.g + node.h + 1;
        } else {
            node.f = node.g + node.h;
        }
    }

    static distance(init: [number, number], target: [number, number]): number {
        const [x1, y1] = init;
        const [x2, y2] = target;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    static getObstaclesNode(obstacles: [number, number][]): NodeBoard[] {
        return obstacles.map(obstacle => new NodeBoard(obstacle));
    }

    static checkPosition(rowsTableau: number, columnsTableau: number, newPosition: [number, number]): boolean {
        return newPosition[0] <= 0 || newPosition[0] > rowsTableau || newPosition[1] <= 0 || newPosition[1] > columnsTableau;
    }

    static generateSuccessors(
        rowsTableau: number,
        columnsTableau: number,
        actualNode: NodeBoard,
    ): NodeBoard[] {
        const moves: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
        const successors: NodeBoard[] = [];
        for (const move of moves) {
            const [dx, dy] = move;
            const [x, y] = actualNode.position;
            const newPosition: [number, number] = [x + dx, y + dy];
            if (!AStar.checkPosition(rowsTableau, columnsTableau, newPosition)) {
                const newNode = new NodeBoard(newPosition, actualNode);
                successors.push(newNode);
            }
        }

        return successors;
    }

    static algorithm(
        rowsTableau: number,
        columnsTableau: number,
        init: [number, number],
        target: [number, number],
        obstacles: [number, number][],
        dangerousNodes: [number, number][]
    ): [number, number][] {
        const initNode = new NodeBoard(init);
        const targetNode = new NodeBoard(target);

        const openList: NodeBoard[] = [initNode];
        const closeList: NodeBoard[] = AStar.getObstaclesNode(obstacles);

        const distanceToEnd = AStar.distance(initNode.position, targetNode.position);
        initNode.h = distanceToEnd;
        AStar.calculateCost(initNode, dangerousNodes);

        while (openList.length > 0) {
            let actualNode = openList[0];
            let actualIndex = 0;

            for (let i = 0; i < openList.length; i++) {
                const node = openList[i];
                if (node.f < actualNode.f) {
                    actualNode = node;
                    actualIndex = i;
                }
            }

            openList.splice(actualIndex, 1);
            closeList.push(actualNode);

            if (actualNode.equals(targetNode)) {
                const path: [number, number][] = [];
                while (actualNode !== null) {
                    path.push(actualNode.position);
                    actualNode = actualNode.father!;
                }
                return path.reverse();
            }

            const successors = AStar.generateSuccessors(rowsTableau, columnsTableau, actualNode);
            const successorsNotInClosed = successors.filter(successor => !closeList.some(node => node.equals(successor)));

            for (const successor of successorsNotInClosed) {
                successor.g = actualNode.g + 1;
                successor.h = AStar.distance(successor.position, targetNode.position);
                AStar.calculateCost(successor, dangerousNodes);
                successor.father = actualNode;

                const existingOpenNode = openList.find(node => node.equals(successor));
                if (!existingOpenNode) {
                    openList.push(successor);
                } else {
                    if (successor.g < existingOpenNode.g) {
                        existingOpenNode.g = successor.g;
                        existingOpenNode.father = actualNode;
                        AStar.calculateCost(existingOpenNode, dangerousNodes);
                    }
                }
            }
        }

        return [];
    }

    static main(
        rowsTableau: number,
        columnsTableau: number,
        init: [number, number],
        end: [number, number],
        obstacles: [number, number][],
        dangerousNodes: [number, number][]
    ): [number, number][] {
        const path = AStar.algorithm(rowsTableau, columnsTableau, init, end, obstacles, dangerousNodes);
        return path;
    }
}
