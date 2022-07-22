import Input from "./input";

export default class ColorInput extends Input {
  createElement() {
    const el = super.createElement();
    const input = el.querySelector("input");
    input.type = "color";
    return el;
  }
}