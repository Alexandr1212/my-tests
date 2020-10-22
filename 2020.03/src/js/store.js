import { Requests, Dater, show_message } from './utils.js';


export class Store {
  constructor(models, port, site_url) {
    this.models = models;
    this.request = new Requests(site_url + port);
    this.dater = new Dater();
  }

  // Check if model exists then get data from db or localStorage
  getData(model, days) {
    if(model && this.models.indexOf(model) != -1) {
      if(localStorage.getItem(model) === null) return this._getModel(model, days);
      return new Promise((resolve) => {
        resolve(this._dateFilter(model, days));
      });
    }
    show_message('Model error');
  }

  // Request to db, set new item in localStorage, filter result.
  _getModel(model, days) {
    return this.request.get(model)
      .then(data => {
        localStorage.setItem(model, data);
      })
      .then(() => {
        return this._dateFilter(model, days);
      })
      .catch(error => {
        show_message('Server error');
      })
  }

  // Filter, return data_days for DatePicker, data for Chart and Table
  _dateFilter(model, days) {
    let data = JSON.parse(localStorage.getItem(model));
    let data_days = JSON.parse(localStorage.getItem(model));

    if(!days) {
      data = data.sort(this.dater.sortByDate).slice(0, 7);
    } else {
      let select_days = [];
      for(let i = 0; i < data.length; i++) {
        if(new Date(data[i]['day']) >= new Date(days[0]) && new Date(data[i]['day']) <= new Date(days[1])) {
          select_days.push(data[i]);
        }
      }
      data = select_days.sort(this.dater.sortByDate);
    }

    for(let i = 0; i < data_days.length; i++)
      for(let key in data_days[i])
        if(key !== 'day') delete data_days[i][key];

    data_days = data_days.sort(this.dater.sortByDate);

    return {
      data_days: data_days,
      data: data 
    };
  }
}
