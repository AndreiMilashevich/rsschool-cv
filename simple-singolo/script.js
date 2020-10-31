const burgerIcon = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const logo = document.querySelector('.logo');
let menu = document.querySelectorAll('.menu_item_v');

const servicesBlock = document.querySelector('.services');
const portfolioBlock = document.querySelector('.portfolio');
const headerBlock = document.querySelector('header');

const serviceMenuButton = document.querySelector('.service-button');
const portfolioMenuButton = document.querySelector('.portfolio-button');
const homeMenuButton = document.querySelector('.home-button')

const serviceMenuButtonVertical = document.querySelector('.service-button-vertical');
const portfolioMenuButtonVertical = document.querySelector('.portfolio-button-vertical');
const homeMenuButtonVertical = document.querySelector('.home-button-vertical')


// menu animation

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  document.body.classList.toggle('no-scroll');
})

// buttons become active when scrolling desctop

window.addEventListener('scroll', () => {
  let scrollDistance = window.pageYOffset;
  if (scrollDistance >= servicesBlock.offsetTop - headerBlock.offsetHeight && scrollDistance + headerBlock.offsetHeight < portfolioBlock.offsetTop) {
    serviceMenuButton.classList.add('active');
  } else {
    serviceMenuButton.classList.remove('active');
  }
})

window.addEventListener('scroll', () => {
  let scrollDistance = window.pageYOffset;
  if (scrollDistance >= portfolioBlock.offsetTop - headerBlock.offsetHeight && scrollDistance  <= portfolioBlock.offsetTop + portfolioBlock.offsetHeight) {
    portfolioMenuButton.classList.add('active');
  } else {
    portfolioMenuButton.classList.remove('active');
  }
})

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;
  if (scrollDistance < servicesBlock.offsetTop - headerBlock.offsetHeight) {
    homeMenuButton.classList.add('active');
  } else {
    homeMenuButton.classList.remove('active');
  }
})

// buttons become active when scrolling mobile

window.addEventListener('scroll', () => {
  let scrollDistance = window.pageYOffset;
  if (scrollDistance >= servicesBlock.offsetTop - headerBlock.offsetHeight && scrollDistance + headerBlock.offsetHeight < portfolioBlock.offsetTop) {
    serviceMenuButtonVertical.classList.add('active');
  } else {
    serviceMenuButtonVertical.classList.remove('active');
  }
})

window.addEventListener('scroll', () => {
  let scrollDistance = window.pageYOffset;
  if (scrollDistance >= portfolioBlock.offsetTop - headerBlock.offsetHeight && scrollDistance + headerBlock.offsetHeight < portfolioBlock.offsetTop + portfolioBlock.offsetHeight) {
    portfolioMenuButtonVertical.classList.add('active');
  } else {
    portfolioMenuButtonVertical.classList.remove('active');
  }
})

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;
  if (scrollDistance < servicesBlock.offsetTop - headerBlock.offsetHeight) {
    homeMenuButtonVertical.classList.add('active');
  } else {
    homeMenuButtonVertical.classList.remove('active');
  }
})

// scroll when click on menu button desctop

serviceMenuButton.addEventListener('click', () => {
  window.scrollTo(0, servicesBlock.offsetTop - headerBlock.offsetHeight + 1);
})

portfolioMenuButton.addEventListener('click', () => {
  window.scrollTo(0, portfolioBlock.offsetTop - headerBlock.offsetHeight + 1);
})

homeMenuButton.addEventListener('click', () => {
  window.scrollTo(0, 0);
})

// scroll when click on menu button mobile

serviceMenuButtonVertical.addEventListener('click', () => {
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  document.body.classList.toggle('no-scroll');
  window.scrollTo(0, servicesBlock.offsetTop - headerBlock.offsetHeight + 1);
})

portfolioMenuButtonVertical.addEventListener('click', () => {
  document.body.classList.remove('no-scroll');
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  window.scrollTo(0, portfolioBlock.offsetTop - headerBlock.offsetHeight + 1);

})

homeMenuButtonVertical.addEventListener('click', () => {
  document.body.classList.remove('no-scroll');
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  window.scrollTo(0, 0);
})
