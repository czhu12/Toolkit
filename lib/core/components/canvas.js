import Component from "./component";

export default class Canvas extends Component {
  static name = 'Canvas';
  constructor(options={}) {
    super(options);
  }

  update() {
    const canvas = this.el;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.options.draw(context);
  }

  createElement() {
    const canvas = this._createElement("canvas");
    if (this.options.width) {
      canvas.width = this.options.width;
    }
    if (this.options.height) {
      canvas.height = this.options.height;
    }
    this.options.draw(canvas.getContext('2d'));

    return canvas;
  }

  getValue() {
    return this.el.toDataURL();
  }
}