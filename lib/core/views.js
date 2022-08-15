// Display
import Text from "./components/text";
import Code from "./components/code";
import IFrame from "./components/iframe";
import HtmlItem from "./components/html_item";

// Input
import Input from "./components/input";
import TextArea from "./components/textarea";
import FileInput from "./components/file_input";
import TimeInput from "./components/time_input";
import DateInput from "./components/date_input";
import Button from "./components/button";
import Slider from "./components/slider";
import Radio from "./components/radio";
import Checkbox from "./components/checkbox";
import ColorInput from "./components/color_input";
import DownloadButton from "./components/download_button";
import Select from "./components/select";

// Data Elements
import ChartItem from "./components/chart";
import DataTable from "./components/data_table";

// Media
import Canvas from "./components/canvas";
import AudioItem from "./components/audio";
import ImageItem from "./components/image";
import VideoItem from "./components/video";
import WebcamInput from "./components/webcam_input";

// Status
import Alert from "./components/alert";
import ProgressBar from "./components/progress_bar";

import { parse } from "acorn";

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
    this.markedIds = this.getCurrentIds().reduce(
      (o, key) => Object.assign(o, {[key]: false}),
      {},
    );
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
      item.onCreate();
    }

    this.idx += 1;
    this.itemsOnPage.push(item);
    if (!this.markedIds[item.id()]) {
      this.markedIds[item.id()] = true;
    } else {
      throw new Error("Duplicate ID's found. Please use options[key] to specify a custom key.");
    }
    return item;
  }
}

class Toolkit {
  static extractImports(code) {
    const result = parse(code, {sourceType: 'module', ecmaVersion: 2020, allowAwaitOutsideFunction: true, allowImportExportEverywhere: true})
    const importNodes = result.body.filter((node) => node.type === "ImportDeclaration");
    const nonImportNodes = result.body.filter((node) => node.type !== "ImportDeclaration");
    const imports = importNodes.map((importNode) => {
      return code.substring(importNode.start, importNode.end);
    })
    const sourceLines = nonImportNodes.map((nonImportNode) => {
      return code.substring(nonImportNode.start, nonImportNode.end);
    })
    return {sourceLines, imports};
  }

  static run(code) {
    const {sourceLines, imports} = Toolkit.extractImports(code);
    const finalCode = `
    ${imports.join("\n")}
    const kit = new window.Toolkit(document.getElementById('main-view'));
    kit.start(async function() {
      const runnable = async (kit) => {${sourceLines.join("\n")}}
      return eval(runnable)(kit);
    });
    `
    const existingScript = document.getElementById("kit--runner");
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = "kit--runner";
    script.type = "module";
    script.innerHTML = finalCode;
    document.body.appendChild(script);
  }

  constructor(container) {
    this.container = container;
    // Remove all children from container for a fresh start
    // Clear all caches
    window.__bs_data = {};
    this.container.innerHTML = '';
    this.container.classList.add("browser-script-screen");
    this.container.classList.add("content");
    this.screen = new Screen(this.container);
    this.triggerId = null;
    this.state = {};
  }

  start(_code) {
    this._code = _code;
    this._trigger();
  }

  logError(error) {
    if (typeof error === "string") {
      this.alert(error, {alertType: "danger"});
    } else {
      this.alert(error.message, {alertType: "danger"});
    }
  }

  async _trigger(e) {
    if (this.locked) return;
    this.state.consoleError = console.error;
    console.error = this.logError.bind(this);

    try {
      this.locked = true;
      this.screen.start();
      this.triggerId = e?.target?.id;
      await this._code();
      this.triggerId = null;
    } catch(e) {
      console.error(e);
      console.error = this.state.consoleError;
    }
    this.screen.finish();

    console.error = this.state.consoleError;
    this.locked = false;
  }

  alert(text, options={}) {
    this.screen.add(Alert, {...options, text});
  }

  text(text, options={}) {
    this.screen.add(Text, {...options, text});
  }

  image(image, options={}) {
    this.screen.add(ImageItem, {...options, image});
  }

  audio(audio, options={}) {
    this.screen.add(AudioItem, {...options, audio});
  }

  video(video, options={}) {
    this.screen.add(VideoItem, {...options, video});
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

  downloadButton(text, filename, data, options={}) {
    options.text = text;
    options.filename = filename;
    options.data = data;
    this.screen.add(DownloadButton, {...options});
  }

  html(htmlString, options={}) {
    options.html = htmlString
    this.screen.add(HtmlItem, {...options});
  }

  canvas(draw, options={}) {
    options.draw = draw;
    const item = this.screen.add(Canvas, {...options});
    return item.getValue();
  }

  textarea(label, options={}) {
    options.label = label;
    const item = this.screen.add(TextArea, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  input(label, options={}) {
    options.label = label;
    const item = this.screen.add(Input, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  colorPicker(label, options={}) {
    options.label = label;
    const item = this.screen.add(ColorInput, {...options, onChange: this._trigger.bind(this)});
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

  select(label, choices, options={}) {
    options.label = label;
    options.choices = choices;
    const item = this.screen.add(Select, {...options, onChange: this._trigger.bind(this)});
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

  webcam(options={}) {
    const item = this.screen.add(WebcamInput, {...options});
    return item.getValue();
  }

  progressBar(label, options={}) {
    options.label = label;
    return this.screen.add(ProgressBar, {...options, onChange: this._trigger.bind(this)});
  }

  dataTable(gridOptions, options={}) {
    options.gridOptions = gridOptions;
    const item = this.screen.add(DataTable, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }
}

if (typeof window !== 'undefined') {
  window.Toolkit = Toolkit;
}

export default Toolkit;