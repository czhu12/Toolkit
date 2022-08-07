import Component from "./component";

export default class Alert extends Component {
  static name = 'Alert';

  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = this._createElement("div");
    el.classList.add("notification")
    el.classList.add(`is-${this.options.alertType}` || "is-danger");
    el.innerHTML = this.options.text;
    return el;
  }
}