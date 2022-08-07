import Component from "./component";
import { marked } from "marked";

export default class Text extends Component {
  static name = 'Text';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = this._createElement("div");
    if (this.options.text) {
      div.innerHTML = marked.parse(this.options.text);
    }
    return div;
  }
}