import Component from "./component";

export default class ImageItem extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const img = document.createElement("img");
    img.id = this.id();
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