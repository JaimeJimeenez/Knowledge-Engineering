export class Example {

  private _attributes : Map<string, string> = new Map<string, string>();

  constructor(attributes : string[], values : string[]) {
    for (let i = 0; i < values.length; i++)
        this._attributes.set(attributes[i], values[i]);
  }

  get attributes() : Map<string, string> {
    return this._attributes;
  }

  set attributes(attributes : Map<string, string>) {
    this._attributes = attributes;
  }

  public addAttribute(name : string, value : string) {
    this._attributes.set(name, value);
  }

  public getValue(name : string) : string {
    return this._attributes.get(name)!;
  }

  public removeAttribute(name : string) {
    this._attributes.delete(name);
  }
}
