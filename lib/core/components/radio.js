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
      labelEl.for = choice;
      optionEl.addEventListener("input", this.options.onChange);
      optionEl.type = "radio";
      optionEl.name = "test";
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