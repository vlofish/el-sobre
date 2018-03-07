import { Component } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent {

  private sobreData = SOBRE_DATA;
  private sobreRowUI = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];
  private disableToZero = false;

  /**
   * Function called by the "Edit"/"Done" button.
   */
  editBudget(id): void {
    let name: string = "Edit";
    let color: string = "primary";

    if (!this.sobreRowUI[id].displayInput) {
      name  = "Done";
      color = "warn";
    }

    this.sobreRowUI[id].displayInput = !this.sobreRowUI[id].displayInput;
    this.sobreRowUI[id].buttonName   = name;
    this.sobreRowUI[id].buttonColor  = color;

    // If budget > $0 enable checkbox and toZero button
    if (this.sobreData[id].budget > 0) {
      this.sobreRowUI[id].disableCheckedBox = false;
      this.disableToZero = false;
    }
  }

  /**
   * Function called by the checkbox.
   */
  checkRow(id): void {
    this.sobreRowUI[id].checkedBox = !this.sobreRowUI[id].checkedBox;
  }

  /**
   * Function called by the "To Zero" button
   */
  budgetToZero(): void {
    this.disableToZero = true;

    this.sobreRowUI.forEach((row, index) => {
      if (row.checkedBox) {
        row.disableCheckedBox = true,
        this.sobreData[index].budget = 0;
      } else {
        this.disableToZero = false;
      }
    });
  }
};

/**
 * interface of the data gotten from the WS.
 */
export interface Sobre {
  id: number;
  name: string;
  budget: number;
};

/**
 * interface of the displayed web elements in the UI table.
 */
export interface SobreRowUI {
  checkedBox: boolean;
  disableCheckedBox: boolean;
  displayInput: boolean;
  buttonName: string;
  buttonColor: string;
};

/**
 * Mocked data to display in the table.
 */
const SOBRE_DATA: Sobre[] = [
  {id: 0, name: 'Name-A', budget: 1200},
  {id: 1, name: 'Name-B', budget: 1500},
  {id: 2, name: 'Name-C', budget: 200}
];

/**
 * Array object in charge of the table web elements.
 */
const SOBRE_ROW_UI: SobreRowUI[] = [
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"}
];
