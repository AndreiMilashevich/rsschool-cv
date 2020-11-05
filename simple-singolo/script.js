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

// debounce

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// menu animation

const toggleMobileMenu = () => {
  burgerIcon.classList.toggle('rotate');
  mobileMenu.classList.toggle('close');
  logo.classList.toggle('move-left');
  for(let i = 0; i < menu.length; i++) {
    menu[i].classList.toggle('close');
  }
  document.body.classList.toggle('no-scroll');
}



// buttons become active when scrolling desktop

const setButtonsActive = () => {
  let scrollDistance = window.pageYOffset;
  portfolioMenuButton.classList.remove('active');
  homeMenuButton.classList.remove('active');
  if (scrollDistance >= servicesBlock.offsetTop - headerBlock.offsetHeight && scrollDistance + headerBlock.offsetHeight < portfolioBlock.offsetTop) {
    serviceMenuButton.classList.add('active');
  } else {serviceMenuButton.classList.remove('active');}
  if (scrollDistance >= portfolioBlock.offsetTop - headerBlock.offsetHeight && scrollDistance  <= portfolioBlock.offsetTop + portfolioBlock.offsetHeight) {
    portfolioMenuButton.classList.add('active');
  }
  if (scrollDistance < servicesBlock.offsetTop - headerBlock.offsetHeight) {
    homeMenuButton.classList.add('active');
  }
}

// scroll when click on menu button desktop

serviceMenuButton.addEventListener('click', () => {
  window.scrollTo({left: 0, top: servicesBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

portfolioMenuButton.addEventListener('click', () => {
  window.scrollTo({left: 0,top: portfolioBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

homeMenuButton.addEventListener('click', () => {
  window.scrollTo({left: 0,top: 0, behavior: 'smooth'});
})


// mobile menu events

burgerIcon.addEventListener('click', () => {
  toggleMobileMenu();
})

serviceMenuButtonVertical.addEventListener('click', () => {
  toggleMobileMenu();
  window.scrollTo({left: 0, top: servicesBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

portfolioMenuButtonVertical.addEventListener('click', () => {
  toggleMobileMenu();
  window.scrollTo({left: 0,top: portfolioBlock.offsetTop - headerBlock.offsetHeight + 1, behavior: 'smooth'});
})

homeMenuButtonVertical.addEventListener('click', () => {
  toggleMobileMenu();
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

window.addEventListener('scroll', debounce(setButtonsActive, 400));
