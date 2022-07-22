import Component from "./component";

export default class Canvas extends Component {
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
    const canvas = document.createElement("canvas");
    if (this.options.width) {
      canvas.width = this.options.width;
    }
    if (this.options.height) {
      canvas.height = this.options.height;
    }
    this.options.draw(canvas.getContext('2d'));

    canvas.id = this.id();
    return canvas;
  }
}