import Component from "./component";

export default class IFrame extends Component {
  static name = 'IFrame';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const frame = this._createElement("iframe");
    frame.src = this.options.src;
    if (this.options.width) {
      frame.width = this.options.width
    }
    if (this.options.height) {
      frame.height = this.options.height
    }

    return frame;
  }
}