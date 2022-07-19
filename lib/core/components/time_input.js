import Input from "./input";

export default class TimeInput extends Input {
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.type = "time";
    return el;
  }
}