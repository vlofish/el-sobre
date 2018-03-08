import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent implements OnInit {

  private sobreData        = SOBRE_DATA;
  private sobreRowUI       = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];
  private disableToZero    = false;

  ngOnInit() {
    this.disableToZeroButton(true);

    this.sobreData.forEach((data, index) => {
      if (data.budget === 0) {
        // this.sobreRowUI[index].checkedBox = true;
        this.sobreRowUI[index].disableCheckedBox = true;
      } else {
        this.disableToZeroButton(false);
      }
    });
  }

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
   * Checks the checkboxes checked or the disabled checkboxes and sets its budget to zero.
   * If all checkboxes are checked or checkboxes disabled; call disableToZeroButton(false).
   * row.disableCheckedBox in the if condition is necessary because of the logic in ngOnInit().
   */
  budgetToZero(): void {
    this.disableToZeroButton(true);

    this.sobreRowUI.forEach((row, index) => {
      if (row.checkedBox || row.disableCheckedBox) {
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
  {id: 0, name: 'Name-A', budget: 0},
  {id: 1, name: 'Name-B', budget: 0},
  {id: 2, name: 'Name-C', budget: 0}
];

/**
 * Array object in charge of the table web elements.
 */
const SOBRE_ROW_UI: SobreRowUI[] = [
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"},
  {checkedBox: false, disableCheckedBox: false, displayInput: false, buttonName: "Edit", buttonColor: "primary"}
];
