// Class for Ajax requests
class Requests {
  constructor(site_url) {
    this.siteUrl = site_url;
  }

  get(model) {
    return new Promise((resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      const full_url = this.siteUrl + '/' + model + '.json';

      xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          try {
            var data = xmlhttp.responseText;
          } catch (err) {
            reject(err.message + " in " + xmlhttp.responseText);
          }
          resolve(data);
        }
      };

      xmlhttp.open("GET", full_url, true);
      xmlhttp.send();
    });
  }
}

// Class for dates
class Dater {
  sortByDate(a, b) {
    return new Date(b.day).getTime() - new Date(a.day).getTime();
  }

  dateFormat(date) {
    return `${date} 00:00:00 GMT+0000`;
  }
}

// Show/hide modal with message (error, success)
function show_message(text, success = false) {
  const message = document.querySelector('.message');
  const message_text = document.querySelector('.message_text');
  const message_close = document.querySelector('.message_close');

  function hide_message() {
    if(success) {
      message.classList.remove('message--success');
    } else {
      message.classList.remove('message--error');
    }

    message_text.innerHTML = '';
    message.style.display = 'none';
  }

  if(success) {
    message.classList.add('message--success');
  } else {
    message.classList.add('message--error');
  }

  message_text.innerHTML = text;
  message.style.display = 'block';

  message_close.addEventListener('click', function () {
    hide_message();
    clearTimeout(timeout);
  });

  let timeout = setTimeout(function () {
    hide_message();
  }, 5000);
}

// Check class name
function has_class(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}


export { Requests, Dater, show_message, has_class };
