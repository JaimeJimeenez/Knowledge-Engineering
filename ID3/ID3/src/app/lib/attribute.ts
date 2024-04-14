import { Dataset } from "./dataset";
import { Example } from "./example";

export class Attribute {

  private _name : string;
  private _positives : Map<string, number> =  new Map<string, number>();
  private _values : Map<string, number> = new Map<string, number>();
  private _numberExamples : number;
  private _merit : number = 0;

  constructor(name : string, table : Dataset) {
    this._name = name;
    this._numberExamples = table.examples!.length;
    this._calculatePositivesNegatives(table);
    this._calculateMerit();
  }

  private _calculatePositivesNegatives(table : Dataset) {
    for (let i = 0; i < table.examples!.length; i++) {
      const example : Example = table.examples![i];
      const value : string = example.getValue(this.name);
      if (this._values.has(value!)) {
        this._values.set(value!, this._values.get(value!)! + 1 );
        if (example.getValue(table.resultName) === 'si')
          this._positives.set(value!, this._positives.get(value!)! + 1);
      }
      else {
        this._values.set(value!, 1);
        if (example.getValue(table.resultName) === 'si')
          this._positives.set(value!, 1);
        else
          this._positives.set(value!, 0);
      }
    }
  }

  private _info(p : number, n : number) {
    if (p === 0) {
      if (n !== 0)
        return -n * (Math.log(n) / Math.log(2));
      else
        return 0;
    }
    if (n !== 0)
      return -p * (Math.log(p) / Math.log(2)) - n * (Math.log(n) / Math.log(2));
    return -p * (Math.log(p) / Math.log(2));
  }

  private _calculateMerit() {
    this._merit = 0;
    let r = 0;
    let n = 0;
    for (const value of Object.keys(this._values)) {
        r = this._values.get(value)! / this._numberExamples;
        n = this._values.get(value)! - this._positives.get(value)!;
        this._merit += r * this._info(this._positives.get(value)! / this._values.get(value)!, n / this._values.get(value)!);
    }
  }

  get name() : string {
    return this._name;
  }

  get merit() : number {
    return this._merit;
  }

  get values() : Map<string, number> {
    return this._values;
  }
}
