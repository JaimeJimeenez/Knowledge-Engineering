import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileReaderComponent } from '../file-reader/file-reader.component';
import { ID3 } from 'src/app/lib/id3';
import { Node } from 'src/app/lib/node';
import { Example } from 'src/app/lib/example';
import { Solution } from 'src/app/interface/solution';

@Component({
  selector: 'id3-board',
  standalone: true,
  imports: [
    CommonModule,
    FileReaderComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  private _atributes : string[] = [];
  private _examples : string[][] = [];
  private _data : Example[] = [];

  public solution : Solution[] = [];
  public rules : string[] = [];

  private _matchData() : void {

    this._examples.forEach((example : string[]) => {
      const newExample : Example = new Example(this._atributes, example);
      this._data.push(newExample);
    });
  }

  onGetData(data : any) : void {
    const { content, isExamples } = data;
    if (isExamples)
      this._examples = content;
    else
      this._atributes = content;
    if (this._atributes.length !== 0 && this._examples.length !== 0)
      this._matchData();
  }

  getSolution(resultName : string, rules : string[][]) : void {
    this.rules = [];
    let input_rule : string = 'Si ';
    rules.forEach((element) => {
      element.forEach((rule : string) => {
        if (rule.split(' ')[0] === resultName) {
          input_rule = input_rule.slice(0, -3);
          input_rule += ' entonces ' + rule
          this.rules.push(input_rule);
          input_rule = 'Si ';
        } else input_rule += rule + ' y ';
      });
    });
  }

  onResolve() {
    const id3 : ID3 = new ID3();
    const root : Node | null = id3.main(this._data, this._atributes);
    const resultName = root?.subtable.resultName;

    let rules : string[][] = [];
    if (root !== null) {
      rules = id3.calculateRules(root);
    }
    console.log(root);
    rules = Array.from(new Set(rules));
    console.log(rules);
    this.getSolution(resultName!, rules);
    console.log(this.rules);
  }
}
