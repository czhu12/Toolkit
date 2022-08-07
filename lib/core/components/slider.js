import BaseInput from "./base_input";

export default class Slider extends BaseInput {
  static name = 'Slider';
  constructor(options={}) {
    super(options);
  }

  update() {
    const label = this.el.getElementsByTagName("label")[0];
    label.innerHTML = `${this.options.label} - ${this.getValue()}`
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