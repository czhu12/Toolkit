import { Grid } from 'ag-grid-community';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import Component from "./component";

export default class DataTable extends Component {
  createElement() {
    const eGridDiv = document.querySelector('#myGrid');
    new Grid(eGridDiv, this.gridOptions);
    return eGridDiv;
  }
}