import Input from "./input";

export default class Slider extends Input {
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
    const input = element.getElementsByTagName("input")[0];
    input.type = "range";
    input.min = this.options.min;
    input.max = this.options.max;
    return element;
  }
}