import Input from "./components/input";
import Button from "./components/button";
import Text from "./components/text";
import Slider from "./components/slider";
import Radio from "./components/radio";
import Checkbox from "./components/checkbox";
import ImageItem from "./components/image";
import AudioItem from "./components/audio";
import VideoItem from "./components/video";
import ChartItem from "./components/chart";
import Code from "./components/code";
import FileInput from "./components/file_input";
import IFrame from "./components/iframe";
import DateInput from "./components/date_input";
import TimeInput from "./components/time_input";
import ProgressBar from "./components/progress_bar";
import DataTable from "./components/data_table";
import Canvas from "./components/canvas";

if (typeof window !== "undefined") {
  window.Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }
  window.NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  }
}

class Screen {
  constructor(container) {
    this.container = container;
    this.itemsOnPage = [];
  }

  start() {
    this.markedIds = this.getCurrentIds().reduce((o, key) => Object.assign(o, {[key]: false}), {});
    this.idx = 0;
  }

  finish() {
    this.remove();
    this.itemsOnPage = [];
  }

  getCurrentIds() {
    const children = Array.from(this.container.children);
    return children.map(element => {
      return element.id;
    });
  }

  remove() {
    for (const id in this.markedIds) {
      if (id && !this.markedIds[id]) {
        document.getElementById(id).remove();
      }
    }
  }

  // Add to itemsOnPage
  add(cls, options) {
    const item = new cls(options);
    if (item.isConnected()) {
      item.update();
    } else {
      const newEl = item.createElement();
      this.container.insertBefore(newEl, this.container.children[this.idx]);
      item.connect();
    }
    this.idx += 1;
    this.itemsOnPage.push(item);
    this.markedIds[item.id()] = true;
    return item;
  }
}

class BrowserScript {
  constructor(container) {
    this.container = container;
    this.container.classList.add("browser-script-screen");
    this.container.classList.add("content");
    this.screen = new Screen(this.container);
    this.triggerId = null;
  }

  start(_code) {
    this._code = _code;
    this._trigger();
  }

  async _execute() {
    this.screen.start();
    await this._code();
    this.screen.finish();
  }

  async _trigger(e) {
    if (this.locked) return;
    try {
      this.locked = true;
      this.triggerId = e?.target?.id;
      await this._execute();
      this.triggerId = null;
    } catch(e) {
      console.error(e);
    }
    this.locked = false;
  }

  text(text, options={}) {
    this.screen.add(Text, {...options, text});
  }

  image(image, options={}) {
    options.image = image;
    this.screen.add(ImageItem, {...options});
  }

  audio(audio, options={}) {
    options.audio = audio;
    this.screen.add(AudioItem, {...options});
  }

  video(video, options={}) {
    options.video = video;
    this.screen.add(VideoItem, {...options});
  }

  chart(config, options={}) {
    options.config = config;
    this.screen.add(ChartItem, {...options});
  }

  iframe(src, options={}) {
    options.src = src;
    this.screen.add(IFrame, {...options});
  }

  code(code, options={}) {
    options.code = code;
    this.screen.add(Code, {...options});
  }

  canvas(draw, options={}) {
    options.draw = draw;
    return this.screen.add(Canvas, {...options});
  }

  input(label, options={}) {
    options.label = label;
    const item = this.screen.add(Input, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  timeInput(label, options={}) {
    options.label = label;
    const item = this.screen.add(TimeInput, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  dateInput(label, options={}) {
    options.label = label;
    const item = this.screen.add(DateInput, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  button(text, options={}) {
    options.text = text;
    const item = this.screen.add(Button, {...options, onClick: this._trigger.bind(this)});
    return item.id() === this.triggerId;
  }

  slider(label, options={}) {
    options.label = label;
    const item = this.screen.add(Slider, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  radio(label, choices, options={}) {
    options.choices = choices;
    options.label = label;
    const item = this.screen.add(Radio, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  checkbox(label, options={}) {
    options.label = label;
    const item = this.screen.add(Checkbox, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  fileInput(label, options={}) {
    options.label = label;
    const item = this.screen.add(FileInput, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  progressBar(label, options={}) {
    options.label = label;
    return this.screen.add(ProgressBar, {...options, onChange: this._trigger.bind(this)});
  }

  dataTable(data, options={}) {
    options.data = data;
    return this.screen.add(DataTable, {...options, onChange: this._trigger.bind(this)});
  }
}

export default BrowserScript