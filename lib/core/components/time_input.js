import BaseInput from "./base_input";

export default class TimeInput extends BaseInput {
  static name = 'TimeInput';
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.classList.add("input");
    input.type = "time";
    return el;
  }
}