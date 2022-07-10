import md5 from "blueimp-md5";
import Component from "./component";

export default class Radio extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = document.createElement("div");
    const label = document.createElement("label");
    if (this.options.label) {
      label.innerHTML = this.options.label;
    }
    div.appendChild(label);
    div.id = this.id();
    this.options.choices.forEach((choice) => {
      const optionEl = document.createElement("input");
      const labelEl = document.createElement("label");
      labelEl.innerHTML = choice;
      const choiceId = this.id() + md5(choice);
      labelEl.htmlFor = choiceId;
      optionEl.addEventListener("input", this.options.onChange);
      optionEl.id = choiceId;
      optionEl.type = "radio";
      optionEl.name = this.id();
      optionEl.value = choice;
      div.appendChild(optionEl);
      div.appendChild(labelEl);
    })

    return div;
  }

  getValue() {
    let value;
    if (this.isConnected()) {
      const selected = this.el.querySelector("input:checked")
      if (selected) {
        value = selected.value;
      }
    } else {
      value = this.options.defaultValue;
    }
    return value;
  }
}