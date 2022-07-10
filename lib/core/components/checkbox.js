import md5 from "blueimp-md5";
import Component from "./component";

export default class Checkbox extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.addEventListener("input", this.options.onChange);
    const checkboxId = this.id() + md5(this.options.label);
    input.id = checkboxId
    label.innerHTML = this.options.label;
    label.htmlFor = checkboxId;
    input.checked = this.options.defaultValue;
    input.type = "checkbox";
    div.id = this.id();
    div.appendChild(input);
    div.appendChild(label);

    return div;
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