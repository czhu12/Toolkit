import BaseInput from "./base_input";

export default class DateInput extends BaseInput {
  static name = 'DateInput';
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.classList.add("input");
    input.type = "date";
    return el;
  }
}