import { Component } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent {

  private sobreData        = SOBRE_DATA;
  private sobreRowUI       = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];
  private disableToZero    = false;

  /**
   * Function called by the "Edit"/"Done" button.
   */
  editBudget(id: number): void {
    this.changeButtonTextAndColor(id);
    this.enableCheckboxAndZeroButton(id);
  }

  /**
   * If sobreRowUI[id].displayInput is true THEN buttonText = Done and buttonColor = warn.
   * If sobreRowUI[id].displayInput is false THEN buttonText = Edit and buttonColor = primary.
   */
  changeButtonTextAndColor(id: number): void {
    let displayInput: boolean = !this.sobreRowUI[id].displayInput;

    this.sobreRowUI[id].displayInput = displayInput;
    this.sobreRowUI[id].buttonName   = displayInput ? "Done" : "Edit";
    this.sobreRowUI[id].buttonColor  = displayInput ? "warn" : "primary";
  }

  /**
   * If budget > 0 and checkbox of the row is disabled:
   *   Enable the checkbox of the specific column and the "To Zero" button.
   */
  enableCheckboxAndZeroButton(id: number): void {
    let greaterThanZero  : boolean = this.sobreData[id].budget > 0;
    let checkBoxDisabled : boolean = this.sobreRowUI[id].disableCheckedBox;

    if (greaterThanZero && checkBoxDisabled) {
      this.sobreRowUI[id].disableCheckedBox = false;
      this.disableToZeroButton(false);
    }
  }

  /**
   * Function called by the checkboxes.
   * Toggles the boolean value of this.sobreRowUI[id].checkedBox.
   */
  checkRow(id): void {
    this.sobreRowUI[id].checkedBox = !this.sobreRowUI[id].checkedBox;
  }

  /**
   * Function called by the "To Zero" button.
   * Checks the checkboxes checked, and sets its budget to zero.
   * If all checkboxes are checked; call disableToZeroButton(false).
   */
  budgetToZero(): void {
    this.disableToZeroButton(true);

    this.sobreRowUI.forEach((row, index) => {
      if (row.checkedBox) {
        row.disableCheckedBox = true,
        this.sobreData[index].budget = 0;
      } else {
        this.disableToZeroButton(false);
      }
    });
  }

  /**
   * If value is true; disable the button "To Zero".
   */
  disableToZeroButton(value: boolean): void {
    this.disableToZero = value;
  }

}

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
