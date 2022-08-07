import Component from "./component";

export default class VideoItem extends Component {
  static name = 'VideoItem';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const video = this._createElement("video");
    if (this.options.width) {
      video.width = this.options.width;
    }
    if (this.options.height) {
      video.height = this.options.height;
    }
    video.controls = true;
    const source = document.createElement("source");
    source.src = this.options.video;
    video.appendChild(source);
    return video;
  }
}