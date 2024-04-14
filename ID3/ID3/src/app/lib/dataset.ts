import { Example } from "./example";

export class Dataset {

  private _examples : Example[] | undefined;
  private _attributes : string[] | undefined = [];
  private _resultName : string  = '';

  constructor(attributes? : string[], examples? : Example[], copy? : Dataset) {
    if (examples !== undefined)
      this._examples = examples;
    else
      this._examples = copy!.examples;

    if (attributes !== undefined) {
      this._attributes = attributes;
      this._resultName = this._attributes[this._attributes.length - 1];
      this._attributes = this._attributes.slice(0, -1);
    }
    else {
      this._attributes = copy!.attributes;
      this._resultName = copy!.resultName;
    }
  }

  get examples() : Example[] | undefined {
    return this._examples;
  }

  set examples(examples : Example[]) {
    this._examples = examples;
  }

  get attributes() : string[] | undefined{
    return this._attributes;
  }

  set attributes(attributes : string[]) {
    this._attributes = attributes;
  }

  get resultName() : string {
    return this._resultName;
  }

  addExample(example : Example) : void {
    this._examples!.push(example);
  }

  removeExample(example : Example) : void {
    this._examples = this._examples!.filter((element) => element !== example);
  }

  examplesWithValueInAttribute(attribute : string, value : string) {
    const examples : Example[] = [];
    for (const example of this._examples!) {
      if (example.getValue(attribute) === value)
        examples.push(example);
    }
    return examples;
  }

  getNumberExamplesWithResult(value : string) {
    let count = 0;
    for (const example of this._examples!)
      if (example.getValue(this._resultName) === value)
        count++;
    return count;
  }
}
