import md5 from "blueimp-md5";
import Input from "./input";

export default class Checkbox extends Input {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const element = super.createElement();
    const input = element.querySelector("input")
    const label = element.querySelector("label")
    input.addEventListener("input", this.options.onChange);
    const checkboxId = this.id() + md5(this.options.label);
    input.id = checkboxId
    label.innerHTML = this.options.label;
    label.htmlFor = checkboxId;
    input.checked = this.options.defaultValue;
    input.type = "checkbox";

    return element;
  }

  getValue() {
    let value = this.options.defaultValue || false;
    if (this.isConnected()) {
      const input = this.el.querySelector("input")
      value = input.checked;
    }
    return value;
  }
}