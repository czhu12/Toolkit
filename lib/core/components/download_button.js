import Component from "./component";

class DownloadButton extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const button = document.createElement("a");
    button.addEventListener("click", this.download);
    button.href = this.options.src
    button.id = this.id();
    return button;
  }
}