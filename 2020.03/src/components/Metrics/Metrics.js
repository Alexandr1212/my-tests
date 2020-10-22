import { DatePicker } from './DatePicker.js';
import { Chart } from './Chart.js';
import { Table } from './Table.js';


export const MetricsContainer = (props) => {
  class Metrics {
    constructor(props) {
      this.props = props;
      this.metrics = this.init();
      this.datePicker;
      this.chart;
      this.table;
    }

    init(days=false) {

      // Store request
      this.props.store.getData(this.props.model, days)
        .then(response => {

          // Create objects
          this.datePicker = new DatePicker({
            data_days: response.data_days, 
            dater: this.props.store.dater
          });
          this.chart = new Chart(response.data);
          this.table = new Table(response.data);
        })
        .then(() => {

          // Render all elements, start events
          // DatePicker
          document.querySelector('#date-picker_render').innerHTML = this.datePicker.render();
          this.datePicker.events(() => {
            document.querySelector('#date-picker_render').innerHTML = this.datePicker.render();
          }, (select_days) => {
            this.init(select_days)
          });

          // Chart
          document.querySelector('#chart_render').innerHTML = this.chart.render();
          this.chart.events((select_metrics) => {
            document.querySelector('#chart_render').innerHTML = this.chart.render(select_metrics);
          });

          // Table
          document.querySelector('#table_render').innerHTML = this.table.render();
          this.table.events();
        });
    }
  }
  
  const metrics = new Metrics(props);
  return (
    `
      <h1 class="main-title">Metrics</h1>
      <div id="date-picker_container">
        <div class="date-picker_calendar">
          <div class="form_container form--date">
            <div class="form_row">
              <div class="form_label">
                From
              </div>
              <div class="form_input" id="date-from"></div>
            </div>
            <div class="form_row">
              <div class="form_label">
                To
              </div>
              <div class="form_input" id="date-to"></div> 
            </div>
          </div>
          <div id="date-picker_render"></div>
        </div>
      </div>
      <div id="chart_container">
        <div id="chart_render"></div>
        <div id="chart_wrap">
          <canvas id="chart_canvas">
        </div>
      </div>
      <div id="table_container">
        <div id="table_render"></div>
      </div>
    `
  );
}
