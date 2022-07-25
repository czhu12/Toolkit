import BaseInput from "./base_input";

export default class ColorInput extends BaseInput {
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.type = "color";
    return el;
  }
}