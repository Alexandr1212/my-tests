// Check class
function has_class(elem, className) {
  return elem.className.split(" ").indexOf(className) > -1;
}

// Remove tags
function strip_tags(str) {
  return str.replace(/(<([^>]+)>)/gi, "");
}

// Show message
function message(el, text, time) {
  el.innerHTML = text;
  el.classList.add("visible");

  setTimeout(function () {
    el.classList.remove("visible");
  }, time);
}

// Input toggle
function input_toggle(name, phone, remove) {
  if (remove) {
    name.removeAttribute("disabled");
    phone.removeAttribute("disabled");
  } else {
    name.setAttribute("disabled", true);
    phone.setAttribute("disabled", true);
  }
}
