import {has_class} from '../../js/utils.js';


export class Table {
  constructor(props) {
    this.props = props;
  }

  // Sort table on click
  sortTable({ target }) {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
      a.children[index].innerHTML,
      b.children[index].innerHTML
    );
  
    for(const tBody of target.closest('table').tBodies)
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));
  
    for(const cell of target.parentNode.cells)
      cell.classList.toggle('sorted', cell === target);
  }

  // Create rows with data
  _createRow(props) {
    return (
      `
        <tr class="table_tr">
          <td class="table_td">${props.day}</td>
          <td class="table_td">${props.clicks}</td>
          <td class="table_td">${props.impressions}</td>
          <td class="table_td">${props.ctr}</td>
          <td class="table_td">${props.amount}</td>
          <td class="table_td">${props.leads}</td>
          <td class="table_td">${props.lead_price}</td>
          <td class="table_td">${props.revenue}</td>
          <td class="table_td">${props.net_revenue}</td>
          <td class="table_td">${props.net_potential}</td>
          <td class="table_td">${props.ecpm}</td>
          <td class="table_td">${props.ecpa}</td>
        </tr>
      `
    );
  }

  // Init events
  events() {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('click', (e) => {
        if(has_class(e.target, 'table_th')) {
          this.sortTable(e);
        }
      });
    });
  }

  // Render table
  render() {
    let table_rows = this.props.map(i => this._createRow(i)).join('');
    return ( 
      `
        <table class="table">
          <thead>
            <tr>
              <th class="table_th">day</th>
              <th class="table_th">clicks</th>
              <th class="table_th">impressions</th>
              <th class="table_th">ctr</th>
              <th class="table_th">amount</th>
              <th class="table_th">leads</th>
              <th class="table_th">lead_price</th>
              <th class="table_th">revenue</th>
              <th class="table_th">net_revenue</th>
              <th class="table_th">net_potential</th>
              <th class="table_th">ecpm</th>
              <th class="table_th">ecpa</th>
            </tr>
          </thead>
          <tbody>${table_rows}</tbody>
        </table>
      `
    );
  }
}
