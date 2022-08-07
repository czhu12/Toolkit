import BaseInput from "./base_input";

export default class Checkbox extends BaseInput {
  static name = 'Checkbox';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const element = super.createElement();
    const input = element.querySelector("input");
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