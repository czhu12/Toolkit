import Component from "./component";

export default class ProgressBar extends Component {
  createElement() {
    const progress = document.createElement("progress");
    progress.value = '0';
    progress.max = '100';
    if (this.options.max) {
      progress.max = this.options.max;
    }
    progress.id = this.id();
    return progress;
  }

  progress(value) {
    this.el.value = value;
  }
}