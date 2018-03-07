import { Component } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent {
  private title = 'El Sobre';

  private dataSource = SOBRE_DATA;
  private rowHandler = SOBRE_ROW_DATA;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];

  private nuBudget = 100 ;

  editRowBudget(id): void {
    let name: string = "Edit";
    let color: string = "primary";

    if (!this.rowHandler[id].displayInput) {
      name  = "Done";
      color = "warn";
    }

    this.rowHandler[id].displayInput = !this.rowHandler[id].displayInput;
    this.rowHandler[id].buttonName   = name;
    this.rowHandler[id].buttonColor  = color;
  }

  checkedRow(id): void {
    this.dataSource[id].check = !this.dataSource[id].check;
  }

  setToZero(): void {
    this.dataSource.forEach((data) => {
      if (data.check) {
        data.budget = 0;
        // data.check = false; TODO: Uncheck the box automatically
      }
    });

    console.info(this.dataSource);
  }
};

export interface Sobre {
  check: boolean;
  id: number;
  name: string;
  budget: number;
};

export interface SobreRow {
  displayInput: boolean;
  buttonName: string;
  buttonColor: string;
};

const SOBRE_DATA: Sobre[] = [
  {check: false, id: 0, name: 'Rent', budget: 1200},
  {check: false, id: 1, name: 'Car', budget: 1500},
  {check: false, id: 2, name: 'Cats', budget: 200}
];

const SOBRE_ROW_DATA: SobreRow[] = [
  {displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {displayInput: false, buttonName: "Edit", buttonColor: "primary"}
];
