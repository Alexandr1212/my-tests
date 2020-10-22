function init_navigation_btn() {
  const navigation_btn = document.querySelector(".navigation-btn");
  const base_navigation = document.querySelector(".base-navigation");

  navigation_btn.addEventListener("click", () => {
    navigation_btn.classList.toggle('navigation-btn--open');
    base_navigation.classList.toggle('base-navigation--slideDown');
  });
}
