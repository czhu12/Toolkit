import Component from "./component";

export default class Button extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const button = this._createElement("button");
    button.addEventListener("click", this.options.onClick);
    button.innerHTML = this.options.text
    return button;
  }

  getValue() {
    this.options.value;
  }
}