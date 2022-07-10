import Component from "./component";
import { marked } from "marked";

export default class Text extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = document.createElement("div");
    if (this.options.text) {
      div.innerHTML = marked.parse(this.options.text);
      div.id = this.id();
    }
    return div;
  }
}