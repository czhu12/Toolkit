import Component from "./component";

export default class ImageItem extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const audio = document.createElement("audio");
    audio.id = this.id();
    audio.controls = true;
    audio.autoplay = true;
    audio.muted = true;
    const source = document.createElement("source");
    source.src = this.options.audio;
    audio.appendChild(source);
    return audio;
  }
}