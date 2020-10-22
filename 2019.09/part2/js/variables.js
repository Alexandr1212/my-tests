var app = {},
  data = [
    {
      name: "Коля",
      phone: "89999999999",
    },
    {
      name: "Петя",
      phone: "89999999999",
    },
    {
      name: "Ваня",
      phone: "89999999999",
    },
    {
      name: "Оля",
      phone: "89999999999",
    },
    {
      name: "Алена",
      phone: "89999999999",
    },
  ],
  start_data = document.querySelector("#start-data"),
  template = document.querySelector("#item-template").innerHTML,
  table = document.querySelector("#table tbody"),
  input_name = document.querySelector("#new-name"),
  input_phone = document.querySelector("#new-phone"),
  error = document.querySelector("#error"),
  success = document.querySelector("#success");
