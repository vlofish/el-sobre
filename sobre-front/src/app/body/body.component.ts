import { Component } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent {

  private dataSource = SOBRE_DATA;
  private rowUIHandler = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];
  private disableToZero = false;

  /**
   *
   */
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

    // If budget > $0 enable checkbox and toZero button
    if (this.dataSource[id].budget > 0) {
      this.rowUIHandler[id].disableCheckedBox = false;
      this.disableToZero = false;
    }
  }

  /**
   *
   */
  checkRow(id): void {
    this.rowUIHandler[id].checkedBox = !this.rowUIHandler[id].checkedBox;
  }

  /**
   *
   */
  budgetToZero(): void {
    this.disableToZero = true;

    this.rowUIHandler.forEach((row, index) => {
      if (row.checkedBox) {
        row.disableCheckedBox = true,
        this.dataSource[index].budget = 0;
      } else {
        this.disableToZero = false;
      }
    });
  }
};

/**
 *
 */
export interface Sobre {
  id: number;
  name: string;
  budget: number;
};

/**
 *
 */
export interface SobreRowUI {
  checkedBox: boolean;
  displayInput: boolean;
  buttonName: string;
  buttonColor: string;
};

/**
 *
 */
const SOBRE_DATA: Sobre[] = [
  {id: 0, name: 'Rent', budget: 1200},
  {id: 1, name: 'Car', budget: 1500},
  {id: 2, name: 'Cats', budget: 200}
];

/**
 *
 */
const SOBRE_ROW_UI: SobreRowUI[] = [
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"}
];
