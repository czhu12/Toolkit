import Component from "./component";

export default class HtmlItem extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = this._createElement("div");
    div.innerHTML = this.options.html
    return div;
  }
}
