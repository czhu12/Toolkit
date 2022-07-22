import Component from "./component";

export default class DownloadButton extends Component {
  constructor(options={}) {
    super(options);
  }

  download() {
    var link = document.createElement('a');
    link.download = this.options.filename;
    link.href = this.options.data;
    link.click();
  }

  createElement() {
    const button = document.createElement("button");
    button.addEventListener("click", this.download.bind(this));
    button.innerHTML = this.options.text;
    button.id = this.id();
    return button;
  }
}