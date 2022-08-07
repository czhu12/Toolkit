import Component from "./component";

export default class ProgressBar extends Component {
  static name = 'ProgressBar';
  createElement() {
    const progress = this._createElement("progress");
    progress.value = '0';
    progress.max = '100';
    if (this.options.max) {
      progress.max = this.options.max;
    }
    return progress;
  }

  progress(value) {
    this.el.value = value;
  }
}