import Component from "./component";

export default class Alert extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = this._createElement("div");
    el.classList.add("notification")
    el.classList.add("is-danger")
    el.innerHTML = this.options.text;
    return el;
  }
}