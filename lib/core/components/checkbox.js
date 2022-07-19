import Input from "./input";

export default class Checkbox extends Input {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const element = super.createElement();
    const input = element.querySelector("input")
    input.checked = this.options.defaultValue;
    input.type = "checkbox";

    return element;
  }

  getValue() {
    const input = this.el.querySelector("input")
    const value = input.checked;
    return value;
  }
}