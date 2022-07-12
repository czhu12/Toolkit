import Component from "./component";
import hljs from 'highlight.js';

export default class Code extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    pre.appendChild(code);
    if (this.options.language) {
      code.classList.add(`language-${this.options.language}`);
    }
    code.innerHTML = this.options.code
    pre.id = this.id();
    return pre;
  }

  update() {
    //hljs.highlightAll();
  }

  onCreate() {
    hljs.highlightAll();
  }
}