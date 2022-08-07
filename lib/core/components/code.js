import Component from "./component";
import hljs from 'highlight.js';

export default class Code extends Component {
  static name = 'Code';
  constructor(options={}) {
    super(options);
  }

  _copyCode(code) {
    navigator.clipboard.writeText(code);
  }

  createElement() {
    const div = this._createElement("div");
    div.innerHTML = `<div class="copy-bar"><i class="fa-solid pointer fa-clipboard"></i></div>`;
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    div.appendChild(pre);
    pre.appendChild(code);
    const clipboard = div.querySelector(".fa-clipboard");
    clipboard.addEventListener("click", this._copyCode.bind(null, this.options.code));
    if (this.options.language) {
      code.classList.add(`language-${this.options.language}`);
    }
    code.innerHTML = this.options.code
    return div;
  }

  update() {
    //hljs.highlightAll();
  }

  onCreate() {
    hljs.highlightAll();
  }
}