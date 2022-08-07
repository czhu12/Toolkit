import md5 from "blueimp-md5";

export default class Component {
  constructor(options) {
    this.options = options;
    this.connect();
  }

  _createElement(element) {
    const created = document.createElement(element);
    created.id = this.id();
    created.classList.add(`kit--${this.type().toLowerCase()}`);
    return created;
  }

  type() {
    return this.constructor.name;
  }

  update() {}

  onCreate() {}

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
    return `${componentType}-${keys}-${values}${this.options.key ? `-${this.options.key}` : ""}`;
  }

  createElement() {
    const div = document.createElement("div");
    div.id = this.id();
    return div;
  }
}