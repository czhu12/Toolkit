import Component from "./component";

export default class FileInput extends Component {
  static name = 'FileInput';
  _onChange(e) {
    const file = e.target.files[0]
    const fileReader = new FileReader();
    const thiz = this;
    fileReader.onload = function(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        thiz.set(textFromFileLoaded);
        thiz.options.onChange();
    };
    const label = this.el.querySelector("span.file-label");
    label.innerHTML = file.name;
  
    if (this.options.as === "text") {
      fileReader.readAsText(file, "UTF-8");
    } else if (this.options.as === "image") {
      fileReader.readAsDataURL(file, "UTF-8");
    } else if (this.options.as === "binary") {
      fileReader.readAsArrayBuffer(file);
    } else {
      fileReader.readAsText(file, "UTF-8");
    }
  }

  value() {
    return window.__bs_data[this.dataKey()];
  }

  set(value) {
    window.__bs_data[this.dataKey()] = value;
  }

  dataKey() {
    return this.id() + "-value";
  }

  createElement() {
    const element = super._createElement("div");
    element.innerHTML = `
      <label>${this.options.label}</label>
      <div class="file is-boxed">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta has-text-centered">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
        </label>
      </div>
    `;

    const input = element.querySelector("input");
    input.addEventListener("input", this._onChange.bind(this));
    input.checked = this.options.defaultValue;
    if (this.options.accept) {
      input.accept = this.options.accept;
    }
    input.type = "file";
    return element
  }

  getValue() {
    const value = this.value();
    if (value) {
      return value;
    } else {
      return this.options.defaultValue;
    }
  }
}