import { Attribute } from "./attribute";
import { Dataset } from "./dataset";

export class Node {

  private _subtable : Dataset
  private _isLeaf : boolean = false;
  private _children : Node[] = [];
  private _value : string | null = null;
  private _fatherValue : string = '';
  private _attributes : Attribute[] = [];
  private _bestAttribute : Attribute | undefined;

  constructor(data : Dataset, value : string | null) {
    this._subtable = data;
    if (value !== null) {
      this._value = value;
      this._isLeaf = true;
    }
    this._initializaAttributes();
  }

  private _initializaAttributes() : void {
    const names = this._subtable.attributes;
    for (let name of names!)
      this._attributes.push(new Attribute(name, this._subtable));
  }

  getBestAttribute() : void {
    this._bestAttribute = this._attributes[0];
    for (let i = 1; i < this._attributes.length; i++)
      if (this._bestAttribute.merit > this._attributes[i].merit)
        this._bestAttribute = this._attributes[i];
  }

  calculateChildren() : void {
    for (const value of this._bestAttribute!.values.keys()) {
      const dataset : Dataset = new Dataset(undefined, undefined, this._subtable);
      dataset.examples = dataset.examplesWithValueInAttribute(this._bestAttribute!.name, value);

      const node : Node = new Node(dataset, null);
      node.fatherValue = value;
      node.attributes = node.removeAttribute(this._bestAttribute!);
      node.subtable.attributes = node.getAttributesNames();
      this._children.push(node);
    }

    for (const node of this._children) {
      node._eraseAttribute(this._bestAttribute!.name);
    }
  }

  private _eraseAttribute(name : string) {
    for (let i = 0; i < this._attributes.length; i++)
      if (this._attributes[i].name === name)
        this._attributes.splice(i, 1);

    for (const example of this._subtable.examples!)
      example.removeAttribute(name);
  }

  get fatherValue() : string {
    return this._fatherValue;
  }

  set fatherValue(value : string) {
    this._fatherValue = value;
  }

  get attributes() : Attribute[] {
    return this._attributes;
  }

  set attributes(attributes : Attribute[]) {
    this._attributes = attributes;
  }

  get subtable() : Dataset {
    return this._subtable;
  }

  get value() : string | null {
    return this._value;
  }

  set value(value : string) {
    this._value = value;
    this._isLeaf = true;
  }

  get children() : Node[] {
    return this._children;
  }

  get isLeaf() : boolean {
    return this._isLeaf;
  }

  get bestAttribute() : Attribute | undefined {
    return this._bestAttribute;
  }

  removeAttribute(attribute : Attribute) {
    return this._attributes.filter(element => attribute.name !== element.name);
  }

  getAttributesNames() {
    const names : string[] = [];
    for (const attribute of this._attributes) {
      const name = attribute.name;
      names.push(name);
    }
    return names;
  }
}
