import { Dataset } from "./dataset";
import { Example } from "./example";
import { Node } from './node';

export class ID3 {

  private _rules : string[][] = [];

  main(examples : Example[], attributes : string[]) {
    const dataset : Dataset = new Dataset(attributes, examples);
    const node : Node = new Node(dataset, null);
    return this._execute(node);
  }

  private _execute(root : Node) {
    if (root.subtable.examples?.length === 0)
      return null;

    const result : string = root.subtable.examples![0].getValue(root.subtable.resultName);
    const count : number = root.subtable.getNumberExamplesWithResult(result);
    if (count === root.subtable.examples?.length) {
      root.value = result;
      return root;
    }

    if (root.subtable.attributes?.length === 0)
      console.log('La lista de atributos se encuentra vacía');
    else {
      root.getBestAttribute();
      root.calculateChildren();
      for (let children of root.children) {
        const temp = this._execute(children)
        if (temp !== null)
          children = temp;
      }
    }
    return root;
  }

  calculateRules(treeSolution : Node) {
    if (treeSolution.children.length === 0) {
      if (treeSolution.isLeaf) {
        const name = treeSolution.bestAttribute?.name
        const value = treeSolution.value === 'si' ? 'si' : 'no';
        this._rules.push(['Siempre', name + ' = ' + value]);
      }
    } else {
      for (const children of treeSolution.children)
        this._in_depthTour(children, [], treeSolution.bestAttribute!.name);
    }

    return this._rules;
  }

  private _in_depthTour(root : Node, rule : string[], fatherName : string) : void {
    if (root.children.length === 0) {
      if (root.isLeaf) {
        rule.push(fatherName + ' = ' + root.fatherValue);
        rule.push(root.subtable.resultName + ' = ' + root.value);
        this._rules.push(rule);
      }
    } else {
      rule.push(fatherName + ' = ' + root.fatherValue);
      for (const children of root.children)
        this._in_depthTour(children, rule, root.bestAttribute!.name);
    }
  }

  checkExample(example : string[], tree : Node) : string {
    if (tree.isLeaf)
      return tree.value!;
    else
      for (const node of tree.children)
        if (example.findIndex((value) => value === node.fatherValue))
          return this.checkExample(example, node);
    return "";
  }
}
