import Component from "./component";

export default class DownloadButton extends Component {
  static name = 'DownloadButton';
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
    const button = this._createElement("button");
    button.innerHTML = `
      <span class="icon is-small">
        <i class="fa-solid fa-cloud-arrow-down"></i>
      </span>
      <span>${this.options.text}</span>
    `;
    button.addEventListener("click", this.download.bind(this));
    button.classList.add("button");
    return button;
  }
}
