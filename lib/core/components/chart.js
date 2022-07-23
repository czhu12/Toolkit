import Component from "./component";
import Chart from 'chart.js/auto';


export default class ChartItem extends Component {
  constructor(options={}) {
    super(options);
  }

  update() {
    const chartStatus = Chart.getChart(this.id());
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    this._draw(this.el);
  }

  _draw(canvasEl) {
    new Chart(canvasEl, this.options.config);
  }

  createElement() {
    const canvasEl = this._createElement("canvas");
    if (this.options.width) {
      canvasEl.width = this.options.width
    }
    if (this.options.height) {
      canvasEl.height = this.options.height
    }
    this._draw(canvasEl);
    return canvasEl;
  }
}