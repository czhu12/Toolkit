import md5 from "blueimp-md5";
import { isPresent } from "../utils";
import Component from "./component";

export default class TextArea extends Component {
  static name = 'TextArea';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = this._createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("textarea");
    input.classList.add("textarea");
    if (this.options.placeholder) {
      input.placeholder = this.options.placeholder;
    }
    if (isPresent(this.options.defaultValue)) {
      input.value = this.options.defaultValue;
    }
    if (this.options.label) {
      label.innerHTML = this.options.label;
    }
    const inputId = this.id() + md5(this.options.label);
    input.id = inputId
    label.htmlFor = inputId;
    input.addEventListener("input", this.options.onChange);
    el.appendChild(label);
    el.appendChild(input);
    return el;
  }

  getValue() {
    const input = this.el.querySelector("textarea");
    const value = input.value;
    return value;
  }
}