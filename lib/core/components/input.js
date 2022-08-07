import BaseInput from "./base_input";

export default class Input extends BaseInput {
  static name = 'Input';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = super.createElement();
    if (this.options.defaultValue) {
      el.querySelector("input").value = this.options.defaultValue;
    }
    el.querySelector("input").classList.add("input");
    return el;
  }

  getValue() {
    const input = this.el.querySelector("input");
    const value = input.value;
    return value;
  }
}