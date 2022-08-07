import Component from "./component";

export default class AudioItem extends Component {
  static name = 'AudioItem';
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const audio = this._createElement("audio");
    audio.controls = true;
    audio.autoplay = true;
    audio.muted = true;
    const source = document.createElement("source");
    source.src = this.options.audio;
    audio.appendChild(source);
    return audio;
  }
}
