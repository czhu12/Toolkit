import md5 from "blueimp-md5";
import { isPresent } from "../utils";
import BaseInput from "./base_input";

export default class Input extends BaseInput {
  constructor(options={}) {
    super(options);
  }

  createElement() {
    const el = super.createElement();
    el.querySelector("input").classList.add("input");
    return el;
  }

  getValue() {
    const input = this.el.querySelector("input");
    const value = input.value;
    return value;
  }
}