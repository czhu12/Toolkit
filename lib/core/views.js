import { marked } from "marked";
import md5 from "blueimp-md5";
const isPresent = (value) => {
  return value !== null && value !== undefined;
}

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

class Component {
  constructor(options) {
    this.options = options;
    this.connect();
  }

  type() {
    return this.constructor.name;
  }

  isConnected() {
    return !!this.el;
  }

  connect() {
    const itemId = this.id();
    this.el = document.getElementById(itemId);
  }

  id() {
    const componentType = this.constructor.name;
    const keys = md5(Object.keys(this.options).sort().join("-"));
    const values = md5(Object.values(this.options).sort().join("-"));
    return `${componentType}-${keys}-${values}`;
  }
}

class Button extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const button = document.createElement("button");
    button.addEventListener("click", this.options.onClick);
    button.innerHTML = this.options.text
    button.id = this.id();
    return button;
  }

  getValue() {
    this.options.value;
  }
}

class Text extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const div = document.createElement("div");
    if (this.options.text) {
      div.innerHTML = marked.parse(this.options.text);
      div.id = this.id();
    }
    return div;
  }
}

class Input extends Component {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = document.createElement("div");
    const label = document.createElement("label");
    const br = document.createElement("br");
    const input = document.createElement("input");
    if (this.options.type) {
      input.type = this.options.type;
    }
    if (this.options.placeholder) {
      input.placeholder = this.options.placeholder;
    }
    if (isPresent(this.options.defaultValue)) {
      input.value = this.options.defaultValue;
    }
    if (this.options.label) {
      label.innerHTML = this.options.label;
    }
    input.addEventListener("input", this.options.onChange);
    el.appendChild(label);
    el.appendChild(br);
    el.appendChild(input);
    el.id = this.id();
    return el;
  }

  getValue() {
    let value;
    if (this.isConnected()) {
      const input = this.el.getElementsByTagName("input")[0];

      value = input.value;
    } else {
      value = this.options.defaultValue;
    }
    return value;
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
      if (!item.isConnected()) {
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
    console.log(e);
    this.triggerId = e?.target?.id;
    await this._execute();
    this._layoutElements();
    this.triggerId = null;
  }

  text(text, options={}) {
    this.screen.add(Text, {...options, text});
  }

  input(options={}) {
    /*
      options.placeholder
      options.label
      options.defaultValue
    */
    const item = this.screen.add(Input, {...options, onChange: this._trigger.bind(this)});
    return item.getValue();
  }

  button(options={}) {
    const item = this.screen.add(Button, {...options, onClick: this._trigger.bind(this)});
    return item.id() === this.triggerId;
  }
}

export default BrowserScript