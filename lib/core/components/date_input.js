import Input from "./input";

export default class DateInput extends Input {
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.type = "date";
    return el;
  }
}