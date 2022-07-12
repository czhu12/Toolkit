import md5 from "blueimp-md5";

export default class Component {
  constructor(options) {
    this.options = options;
    this.connect();
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
    return `${componentType}-${keys}-${values}`;
  }
}