//variables for burger menu

const burgerIcon = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const logo = document.querySelector('.logo');
let menu = document.querySelectorAll('.menu_item_v');

//variables for site's sections

const servicesBlock = document.querySelector('.services');
const portfolioBlock = document.querySelector('.portfolio');
const headerBlock = document.querySelector('header');

//variables for main menu buttons

const serviceMenuButton = document.querySelector('.service-button');
const portfolioMenuButton = document.querySelector('.portfolio-button');
const homeMenuButton = document.querySelector('.home-button');

//variables for vertical menu

const serviceMenuButtonVertical = document.querySelector('.service-button-vertical');
const portfolioMenuButtonVertical = document.querySelector('.portfolio-button-vertical');
const homeMenuButtonVertical = document.querySelector('.home-button-vertical');

//portfolio buttons

const filterButtons = document.querySelectorAll('.filter');
const filterButtonAll = document.querySelector('.all-button');
const filterButtonWeb = document.querySelector('.webdesign-button');
const filterButtonGraphic = document.querySelector('.graphicdesign-button');
const filterButtonArt = document.querySelector('.artwork-button');

//portfolio images

const portfolioImagesAll = document.querySelectorAll('.image');
const portfolioImagesWeb = document.querySelectorAll('.webdesign-image');
const portfolioImagesGraphic = document.querySelectorAll('.graphicdesign-image');
const portfolioImagesArt = document.querySelectorAll('.artwork-image');

// slider arrows

const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

// slides

const slides = document.querySelectorAll('.picture');
let position = 0;

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
  let scrollDistance = window.pageYOffset;
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
  window.scrollTo({left: 0, top: servicesBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})



portfolioMenuButton.addEventListener('click', () => {
  window.scrollTo({left: 0,top: portfolioBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

homeMenuButton.addEventListener('click', () => {
  window.scrollTo({left: 0,top: 0, behavior: 'smooth'});
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
  window.scrollTo({left: 0, top: servicesBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

portfolioMenuButtonVertical.addEventListener('click', () => {
  document.body.classList.remove('no-scroll');
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  window.scrollTo({left: 0,top: portfolioBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});

})

homeMenuButtonVertical.addEventListener('click', () => {
  document.body.classList.remove('no-scroll');
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
  menu[i].classList.toggle('close');
  }
  window.scrollTo({left: 0,top: 0, behavior: 'smooth'});
})

// portfolio filter

filterButtonWeb.addEventListener('click', () => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove('filter-active');
  }
  filterButtonWeb.classList.add('filter-active');
  for (let i = 0; i < portfolioImagesAll.length; i++) {
    portfolioImagesAll[i].classList.remove('order');
  }
  for (let i = 0; i < portfolioImagesWeb.length; i++) {
    portfolioImagesWeb[i].classList.add('order');
  }
})

filterButtonArt.addEventListener('click', () => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove('filter-active');
  }
  filterButtonArt.classList.add('filter-active');
  for (let i = 0; i < portfolioImagesAll.length; i++) {
    portfolioImagesAll[i].classList.remove('order');
  }
  for (let i = 0; i < portfolioImagesArt.length; i++) {
    portfolioImagesArt[i].classList.add('order');
  }
})

filterButtonGraphic.addEventListener('click', () => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove('filter-active');
  }
  filterButtonGraphic.classList.add('filter-active');
  for (let i = 0; i < portfolioImagesAll.length; i++) {
    portfolioImagesAll[i].classList.remove('order');
  }
  for (let i = 0; i < portfolioImagesGraphic.length; i++) {
    portfolioImagesGraphic[i].classList.add('order');
  }
})

filterButtonAll.addEventListener('click', () => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove('filter-active');
  }
  filterButtonAll.classList.add('filter-active');
  for (let i = 0; i < portfolioImagesAll.length; i++) {
    portfolioImagesAll[i].classList.remove('order');
  }
})

// slider
// wrong way
/*
arrowLeft.addEventListener('click', () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add('left');
  }
})

arrowRight.addEventListener('click', () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add('right');
  }
})*/

const slideMove = () => {
  for (let i = 0; i < slides.length; i++) {
  slides[i].style.transform = `translateX(${position}00%)`;
  }
};

arrowLeft.addEventListener('click', () => {
  if (position === 0) {
    position = -(slides.length - 1);
    slideMove();
  } else {
position++;
slideMove();
}
});

arrowRight.addEventListener('click', () => {
  if (position === -(slides.length - 1)) {
    position = 0;
    slideMove();
  } else {
position--;
slideMove();
}
});
