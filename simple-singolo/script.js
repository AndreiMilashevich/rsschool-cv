const burgerIcon = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const logo = document.querySelector('.logo');
let menu = document.querySelectorAll('.menu_item_v');

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  setTimeout(3000);
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('hidden');
  }
})
