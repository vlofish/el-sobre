import { Component } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent {
  private title = 'El Sobre';

  private dataSource = SOBRE_DATA;
  private rowUIHandler = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];

  private nuBudget = 100 ;

  editBudget(id): void {
    let name: string = "Edit";
    let color: string = "primary";

    if (!this.rowUIHandler[id].displayInput) {
      name  = "Done";
      color = "warn";
    }

    this.rowUIHandler[id].displayInput = !this.rowUIHandler[id].displayInput;
    this.rowUIHandler[id].buttonName   = name;
    this.rowUIHandler[id].buttonColor  = color;
  }

  checkRow(id): void {
    this.rowUIHandler[id].checkedBox = !this.rowUIHandler[id].checkedBox;
  }

  setToZero(): void {
    this.rowUIHandler.forEach((row, index) => {
      if (row.checkedBox) {
        this.dataSource[index].budget = 0;
      }
    });
  }
};

export interface Sobre {
  id: number;
  name: string;
  budget: number;
};

export interface SobreRowUI {
  checkedBox: boolean;
  displayInput: boolean;
  buttonName: string;
  buttonColor: string;
};

const SOBRE_DATA: Sobre[] = [
  {id: 0, name: 'Rent', budget: 1200},
  {id: 1, name: 'Car', budget: 1500},
  {id: 2, name: 'Cats', budget: 200}
];

const SOBRE_ROW_UI: SobreRowUI[] = [
  {checkedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"}
];
