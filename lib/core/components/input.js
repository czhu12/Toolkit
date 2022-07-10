import { isPresent } from "../utils";
import Component from "./component";

export default class Input extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = document.createElement("div");
    const label = document.createElement("label");
    const br = document.createElement("br");
    const input = document.createElement("input");
    if (this.options.type) {
      input.type = this.options.type;
    }
    if (this.options.placeholder) {
      input.placeholder = this.options.placeholder;
    }
    if (isPresent(this.options.defaultValue)) {
      input.value = this.options.defaultValue;
    }
    if (this.options.label) {
      label.innerHTML = this.options.label;
    }
    input.addEventListener("input", this.options.onChange);
    el.appendChild(label);
    el.appendChild(br);
    el.appendChild(input);
    el.id = this.id();
    return el;
  }

  getValue() {
    let value;
    if (this.isConnected()) {
      const input = this.el.getElementsByTagName("input")[0];
      value = input.value;
    } else {
      value = this.options.defaultValue;
    }
    return value;
  }
}