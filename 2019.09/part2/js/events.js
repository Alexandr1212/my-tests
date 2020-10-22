// Validation for phone input
document.addEventListener("keypress", function (e) {
  if (has_class(e.target, "phone-control")) {
    e.preventDefault();

    let phone = e.target.value;

    if (e.key === "+" && phone.indexOf("+") === -1 && phone.length === 0) {
      e.target.value += String.fromCharCode(e.which);
    }

    if (e.key === "-" && phone.length > 1 && phone[phone.length - 1] != "-") {
      e.target.value += String.fromCharCode(e.which);
    }

    if (e.key != "+") {
      let key = Number(e.key);
      if (!isNaN(key) || !e.key === null) {
        e.target.value += String.fromCharCode(e.which);
      }
    }
  }
});

// Close error message
document.addEventListener("click", function (e) {
  if (has_class(e.target, "close")) {
    e.target.parentNode.classList.remove("visible");
  }
});

// Start data
start_data.addEventListener("click", function () {
  for (let i = 0; i < data.length; i++) {
    let item = app.phoneBook.create({
      name: data[i].name,
      phone: data[i].phone,
    });
    app.phoneBook.add(item);
    item.save();
  }
});
