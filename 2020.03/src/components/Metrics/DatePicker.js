import {has_class} from '../../js/utils.js';


export class DatePicker {
  constructor(props) {
    this.props = props.data_days;
    this.dater = props.dater;
    this.dayFrom = '';
    this.dayTo = '';
    this.selectStart = false;
    this.startDate = new Date(this.dater.dateFormat(this.props[this.props.length-1]['day']));
    this.endDate = new Date(this.dater.dateFormat(this.props[0]['day']));
    this.currentMonth = this.startDate.getMonth();
    this.currentYear = this.startDate.getFullYear();
    this.week = this.getWeek();
  }

  // Get name days in week for table head
  getWeek() {
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week.map(i => `<th class="date-picker_th">${i}</th>`).join('');
  }

  // If click btn change month and year
  next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
  }
  
  // If click btn change month and year
  previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
  }

  // Init events
  events(self_rerender, all_rerender) {
    document.addEventListener('click', (e) => {

      // Select days
      if(has_class(e.target, 'date-picker_td') && !has_class(e.target, 'blocked')) {
        let day = e.target.innerHTML;
        if (day < 10) day = '0' + day;
        day = this.currentYear + '-' + (Number(this.currentMonth) + 1) + '-' + day;
        e.target.classList.add('selected');

        if(this.selectStart == false) {
          
          // Select start date
          document.querySelector('#date-from').classList.add('select');
          document.querySelector('#date-from').innerHTML = day;
          this.dayFrom = day;
          this.selectStart = true;
        } else {

          // Select end date
          document.querySelector('#date-to').classList.add('select');
          document.querySelector('#date-to').innerHTML = day;
          this.dayTo = day;

          // Change dates if end date < start date
          if(new Date(this.dayTo) < new Date(this.dayFrom)) {
            this.dayTo = this.dayFrom;
            this.dayFrom = day;

            document.querySelector('#date-from').innerHTML = this.dayFrom;
            document.querySelector('#date-to').innerHTML = this.dayTo;
          }

          document.querySelector('#date-from').classList.remove('select');
          document.querySelector('#date-to').classList.remove('select');
          this.selectStart = false;
          let select_days = [this.dayFrom, this.dayTo];
          all_rerender(select_days);
        }
      }

      // Previous month and year, rerender page
      if(e.target && e.target.id === 'previous') {
        this.previous();
        self_rerender();
      }

      // Next month and year, rerender page
      if(e.target && e.target.id === 'next') {
        this.next();
        self_rerender();
      }
    });
  }

  // Render DatePicker
  render() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let firstDay = (new Date(this.startDate)).getDay();
    let tbl = '';
    let title = months[this.currentMonth] + " " + this.currentYear;

    function daysInMonth(month, year) {
      return 32 - new Date(year, month, 32).getDate();
    }

    // Create table
    let date = 1;
    for(let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for(var j = 0; j < 7; j++) {
        if(i === 0 && j < firstDay) {
          
          // Empty days
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);

          // Search date in month
        } else if(date > daysInMonth(this.currentMonth, this.currentYear)) {
          break;
        } else {
          
          // Create td with day
          let cell = document.createElement("td");
          cell.className = "date-picker_td";
          cell.innerHTML = date;

          let now = new Date(this.dater.dateFormat(`${this.currentYear}-${this.currentMonth + 1}-${date}`));

          // Search blocked days
          if(now < this.startDate || now > this.endDate) cell.className = "date-picker_td blocked";

          // Search start day
          if(now === this.startDate) cell.className = "date-picker_td today";

          // Search end day
          if(now === this.endDate) cell.className = "date-picker_td";

          row.appendChild(cell);
          date++;
        }
      }
      tbl += row.outerHTML;
    }

    return (
      `
        <div class="date-picker_topline">
          <button class="date-picker_btn" id="previous">&#8249;</button>
          <div class="date-picker_title">${title}</div>
          <button class="date-picker_btn" id="next">&#8250;</button>
        </div>
        <table class="date-picker_table" data-lang="en">
          <thead>
            <tr>${this.week}</tr>
          </thead>
          <tbody>${tbl}</tbody>
        </table>
      `
    );
  }
}
