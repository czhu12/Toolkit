import Component from "./component";

export default class IFrame extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const frame = document.createElement("iframe");
    frame.src = this.options.src;
    if (this.options.width) {
      frame.width = this.options.width
    }
    if (this.options.height) {
      frame.height = this.options.height
    }
    frame.id = this.id();

    return frame;
  }
}