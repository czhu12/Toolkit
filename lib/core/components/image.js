import Component from "./component";

export default class ImageItem extends Component {
  static name = 'ImageItem';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const img = this._createElement("img");
    img.src = this.options.image;
    if (this.options.width) {
      img.width = this.options.width;
    }
    if (this.options.height) {
      img.height = this.options.height;
    }
    return img;
  }
}