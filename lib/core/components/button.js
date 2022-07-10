import Component from "./component";

export default class Button extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const button = document.createElement("button");
    button.addEventListener("click", this.options.onClick);
    button.innerHTML = this.options.text
    button.id = this.id();
    return button;
  }

  getValue() {
    this.options.value;
  }
}