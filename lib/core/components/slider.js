import BaseInput from "./base_input";

export default class Slider extends BaseInput {
  constructor(options={}) {
    super(options);
  }

  update() {
    if (this.isConnected()) {
      const label = this.el.getElementsByTagName("label")[0];
      label.innerHTML = `${this.options.label} - ${this.getValue()}`
    }
  }

  createElement() {
    const element = super.createElement();
    const input = element.querySelector("input");
    input.type = "range";
    input.min = this.options.min;
    input.max = this.options.max;
    return element;
  }
}