function init_custom_range() {
  let range = document.querySelector('.custom-range');
  let range_value = document.querySelector('.custom-range-value');

  range.value = 75;
  range_value.innerHTML = 75 + ' %';

  range.addEventListener("input", function() {
    range_value.innerHTML = range.value + ' %';
  });

  range.addEventListener("change", function() {
    range_value.innerHTML = range.value + ' %';
  });
}