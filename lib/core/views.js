import Input from "./components/input";
import Button from "./components/button";
import Text from "./components/text";
import Slider from "./components/slider";
import Radio from "./components/radio";

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

  getCurrentIds() {
    const children = Array.from(this.container.children);
    return children.map(element => {
      return element.id;
    });
  }

  draw() {
    const markedIds = this.getCurrentIds().reduce((o, key) => Object.assign(o, {[key]: false}), {});
    this.itemsOnPage.forEach(item => {
      if (item.isConnected()) {
        item.update();
      } else {
        const newEl = item.createElement();
        this.container.appendChild(newEl);
      }
      markedIds[item.id()] = true;
    });
    for (const id in markedIds) {
      if (id && !markedIds[id]) {
        document.getElementById(id).remove();
      }
    }
    this.itemsOnPage = [];
  }

  add(cls, options) {
    const item = new cls(options);
    this.itemsOnPage.push(item);
    return item;
  }
}

class BrowserScript {
  constructor(container) {
    this.container = container;
    this.container.classList.add("browser-script-screen");
    this.screen = new Screen(this.container);
    this.triggerId = null;
  }

  start(code) {
    this.code = code;
    this._trigger();
  }

  async _execute() {
    await this.code();
  }

  _layoutElements() {
    this.screen.draw();
  }

  async _trigger(e) {
    this.triggerId = e?.target?.id;
    await this._execute();
    this._layoutElements();
    this.triggerId = null;
  }

  text(text, options={}) {
    this.screen.add(Text, {...options, text});
  }

  input(label, options={}) {
    options.label = label;
    const item = this.screen.add(Input, {...options, onChange: this._trigger.bind(this)});
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
}

export default BrowserScript