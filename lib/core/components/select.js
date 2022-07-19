import { isPresent } from "../utils";
import Component from "./component";

export default class Select extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = document.createElement("div");
    const select = document.createElement("select");
    this.options.choices.forEach((choice) => {
      if (this.options.defaultValue == choice.value) {
        select.add(new Option(choice.text, choice.value, true));
      } else {
        select.add(new Option(choice.text, choice.value));
      }
    })

    if (isPresent(this.options.defaultValue)) {
      input.value = this.options.defaultValue;
    }

    select.addEventListener("input", this.options.onChange);
    el.appendChild(select);
    el.id = this.id();
    return el;
  }

  getValue() {
    let value;
    if (this.isConnected()) {
      const select = this.el.getElementsByTagName("select")[0];
      value = select.value;
    } else {
      value = this.options.defaultValue;
    }
    return value;
  }
}