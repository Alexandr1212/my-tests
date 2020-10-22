function init_custom_select() {
  let select = document.getElementsByTagName("select"),
    liElement,
    ulElement,
    optionValue,
    iElement,
    optionText,
    selectDropdown,
    elementParentSpan;

  for (let select_i = 0, len = select.length; select_i < len; select_i++) {
    if (select[select_i].classList.contains("custom-select")) {
      select[select_i].style.display = "none";
      wrapElement(
        document.getElementById(select[select_i].id),
        document.createElement("div"),
        select_i,
        select[select_i].getAttribute("placeholder-text")
      );

      for (let i = 0; i < select[select_i].options.length; i++) {
        liElement = document.createElement("li");
        optionValue = select[select_i].options[i].value;
        optionText = document.createTextNode(select[select_i].options[i].text);
        liElement.className = "custom-select__list-item";
        liElement.setAttribute("data-value", optionValue);
        liElement.appendChild(optionText);
        ulElement.appendChild(liElement);
        liElement.addEventListener(
          "click",
          function () {
            displyUl(this);
          },
          false
        );
      }
    }
  }

  function wrapElement(el, wrapper, i, placeholder) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    document.addEventListener("click", function (e) {
      let clickInside = wrapper.contains(e.target);

      if (!clickInside) {
        let menu = wrapper.getElementsByClassName("custom-select__list");
        menu[0].classList.remove("custom-select__list--active");
        menu[0].previousSibling.classList.remove("custom-select__button--active");
      }
    });
    let buttonElement = document.createElement("button"),
      spanElement = document.createElement("span"),
      spanText = document.createTextNode(placeholder);
    iElement = document.createElement("i");
    ulElement = document.createElement("ul");
    wrapper.className = "custom-select custom-select--" + i;
    buttonElement.className =
      "custom-select__button custom-select__button--" + i;
    buttonElement.setAttribute("data-value", "");
    buttonElement.setAttribute("type", "button");
    spanElement.className = "custom-select custom-select--" + i;
    iElement.className = "chevron-down";
    ulElement.className = "custom-select__list custom-select__list--" + i;
    ulElement.id = "custom-select__list-" + i;
    wrapper.appendChild(buttonElement);
    spanElement.appendChild(spanText);
    buttonElement.appendChild(spanElement);
    buttonElement.appendChild(iElement);
    wrapper.appendChild(ulElement);
  }

  function displyUl(element) {
    if (element.tagName == "BUTTON") {
      selectDropdown = element.parentNode.getElementsByTagName("ul");

      for (let i = 0, len = selectDropdown.length; i < len; i++) {
        selectDropdown[i].classList.toggle("custom-select__list--active");
        selectDropdown[i].previousSibling.classList.toggle("custom-select__button--active");
      }
    } else if (element.tagName == "LI") {
      let selectId = element.parentNode.parentNode.getElementsByTagName(
        "select"
      )[0];
      selectElement(selectId.id, element.getAttribute("data-value"));
      elementParentSpan = element.parentNode.parentNode.getElementsByTagName(
        "span"
      );
      element.parentNode.classList.toggle("custom-select__list--active");
      element.parentNode.previousSibling.classList.toggle("custom-select__button--active");
      elementParentSpan[0].textContent = element.textContent;
      elementParentSpan[0].parentNode.setAttribute(
        "data-value",
        element.getAttribute("data-value")
      );
    }
  }

  function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
    element.setAttribute("selected", "selected");
  }

  let buttonSelect = document.getElementsByClassName("custom-select__button");

  for (let i = 0, len = buttonSelect.length; i < len; i++) {
    buttonSelect[i].addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        displyUl(this);
      },
      false
    );
  }
}
