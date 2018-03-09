import { Component, OnInit } from '@angular/core';
import { MOCKED_SOBRE_DATA } from '../constants/mocked-sobre-data';
import { SOBRE_ROW_UI } from '../constants/sobre-row-ui';

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html'
})
export class BodyComponent implements OnInit {

  private sobreData        = MOCKED_SOBRE_DATA;
  private sobreRowUI       = SOBRE_ROW_UI;
  private columnsToDisplay = ['checkBox', 'name', 'budget', 'adjust'];
  private disableToZero;

  ngOnInit(): void {
    this.sobreData.forEach((data, index) => {
      if (data.budget === 0) {
        this.sobreRowUI[index].checkedBox = true;
        this.sobreRowUI[index].disableCheckedBox = true;
      }
    });


    this.toZeroButtonAvailability();
  }

  /**
   * Function called by the "Edit"/"Done" button.
   */
  editBudget(id: number): void {
    this.changeButtonTextAndColor(id);
    this.enableCheckbox(id);
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
   *   Enable the checkbox of the specific column.
   */
  enableCheckbox(id: number): void {
    let greaterThanZero  : boolean = this.sobreData[id].budget > 0;
    let checkBoxDisabled : boolean = this.sobreRowUI[id].disableCheckedBox;

    if (greaterThanZero && checkBoxDisabled) {
      this.sobreRowUI[id].checkedBox = false;
      this.sobreRowUI[id].disableCheckedBox = false;
      this.toZeroButtonAvailability(); // Whenever working with checkedBox and disableCheckedBox call this method.
    }
  }

  /**
   * Function called when clicking on a checkbox.
   * Toggles the boolean value of this.sobreRowUI[id].checkedBox.
   * setTimeout() fixes a bug that doesn't allow to set the checkmark as true and the uncheck mark as false.
   */
  checkBox(id): void {
    setTimeout(() => {
      this.sobreRowUI[id].checkedBox = !this.sobreRowUI[id].checkedBox;
      this.toZeroButtonAvailability();
    }, 100);
  }

  /**
   * Function called by the "To Zero" button.
   * Checks the checkboxes checked or the disabled checkboxes and sets its budget to zero.
   * row.disableCheckedBox in the if condition is necessary because of the logic in ngOnInit().
   */
  budgetToZero(): void {
    this.sobreRowUI.forEach((row, index) => {
      if (row.checkedBox || row.disableCheckedBox) {
        row.disableCheckedBox = true,
        this.sobreData[index].budget = 0;
      }
    });

    this.toZeroButtonAvailability();
  }

  /**
   * Sweep all the checked and disabled properties of the rows.
   * If at least one row meets the requirement; enable the To Zero button.
   * Requirement = checkedBox: true, disableCheckedBox: false.
   */
  toZeroButtonAvailability(): void {
    this.disableToZero = true;

    for (let i = 0; i < this.sobreRowUI.length; i++) {
      let checkBox = this.sobreRowUI[i].checkedBox;
      let disabled = this.sobreRowUI[i].disableCheckedBox;

      if (checkBox && !disabled) {
        this.disableToZero = false;
        break;
      }
    }
  }

}