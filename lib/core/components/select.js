import { isPresent } from "../utils";
import Component from "./component";

export default class Select extends Component {
  static name = 'Select';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = this._createElement("div");
    const label = document.createElement("label");
    label.innerHTML = this.options.label;
    const selectDiv = document.createElement("div");

    const select = document.createElement("select");
    this.options.choices.forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice;
      option.innerHTML = choice;
      if (this.options.defaultValue === choice) {
        option.selected = true;
      }
      select.appendChild(option);
    })

    if (isPresent(this.options.defaultValue)) {
      select.value = this.options.defaultValue;
    }

    select.addEventListener("input", this.options.onChange);
    selectDiv.classList.add("select");
    selectDiv.appendChild(select)
    el.appendChild(label);
    el.appendChild(selectDiv);
    return el;
  }

  getValue() {
    const select = this.el.querySelector("select");
    return select.value;
  }
}