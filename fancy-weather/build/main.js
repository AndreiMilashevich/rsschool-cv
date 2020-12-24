/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/index.scss":
/*!*************************!*\
  !*** ./scss/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./scripts/script.js":
/*!***************************!*\
  !*** ./scripts/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./scss/index.scss");


const refreshButton = document.querySelector('.button_refresh');
const arrows = document.querySelector('.button_refresh_arrows');
const time = document.querySelector('.time');
const langButton = document.querySelector('.button_lang');
const searchButton = document.querySelector('.submit');
const inputField = document.querySelector('.input_field');
const imageLinksLibrary = [
  'https://cdn.photosight.ru/img/4/a2d/5942981_xlarge.jpg',
  'https://russianplanes.net/images/to271000/270331.jpg',
  'https://russianplanes.net/images/to269000/268392.jpg',
  'https://russianplanes.net/images/to238000/237498.jpg',
  'https://russianplanes.net/images/to277000/276528.jpg',
  'https://russianplanes.net/images/to180000/179923.jpg',
  'https://russianplanes.net/images/to254000/253139.jpg',
  'https://russianplanes.net/images/to263000/262475.jpg',
  'https://russianplanes.net/images/to275000/274157.jpg',
  'https://russianplanes.net/images/to267000/266680.jpg',
  'https://russianplanes.net/images/to267000/266697.jpg',
  'https://russianplanes.net/images/to248000/247127.jpg',
  'https://russianplanes.net/images/to266000/265182.jpg',
  'https://russianplanes.net/images/to178000/177881.jpg',
  'https://russianplanes.net/images/to166000/165952.jpg',
  'https://russianplanes.net/images/to142000/141759.jpg'
]

const city = document.querySelector('.city');
const tempNow = document.querySelector('.temp_now');
const feels = document.querySelector('.feels');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather_description');
const weatherNowIcon = document.querySelector('.weather_image_main');
const weatherItem = document.querySelector('.weather_item');

searchButton.addEventListener('click', () => {
  console.log('click');
  getWeather();
  setTimeout(setWeather(), 1000);
})

let lang;
let tempFlag = 'c';

function getLang() {
  if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
    lang = en;
  } else {
    lang = localStorage.getItem('lang');
  }
}

function setPageContent() {
  if (lang === 'en') {
    langButton.textContent = 'EN';
    inputField.placeholder = 'Enter city'
  } else {
    langButton.textContent = 'RU';
    inputField.placeholder = 'Найти город'
  }
}

let unsplashAccessKey='cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';

async function getWeather() {
  let searchSity = document.querySelector('.input_field');
  console.log(searchSity.textContent);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchSity.value}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  localStorage.setItem('weather', JSON.stringify(data));
}

function convertTemp(temp) {
  if (tempFlag === 'c') {
    return Math.round(temp - 273.15)
  } else {
    return Math.round((temp * 9 / 5) - 459.67) // converting Kelvins to Fahrenheit
  }
}

function setWeather() {
  const data = JSON.parse(localStorage.getItem('weather'));
  console.log(data);
  city.textContent = `${data.name}, ${data.sys.country}`;
  tempNow.textContent = `${convertTemp(data.main.temp)}°`;
  feels.textContent = `${convertTemp(data.main.feels_like)}`;
  wind.textContent = `${data.wind.speed}`;
  humidity.textContent = `${data.main.humidity}`;
  weatherDescription.textContent = `${data.weather[0].description}`;
  switch(data.weather[0].main) {
    case('Snow'):
    weatherNowIcon.style.backgroundImage = "url('../icons/snow.svg')";
    break;
    case('Thunderstorm'):
    weatherNowIcon.style.backgroundImage = "url('../icons/thunderstorms.svg')";
    break;
    case('Drizzle'):
    weatherNowIcon.style.backgroundImage = "url('../icons/drizzle.svg')";
    break;
    case('Fog'):
    weatherNowIcon.style.backgroundImage = "url('../icons/mist.svg')";
    break;
    case('Clean'):
    weatherNowIcon.style.backgroundImage = "url('../icons/clear-day.svg')";
    break;
    case('Clouds'):
    weatherNowIcon.style.backgroundImage = "url('../icons/cloudy.svg')";
    break;
    case('Rain'):
    weatherNowIcon.style.backgroundImage = "url('../icons/rain.svg')";
    break;
    default:
    weatherNowIcon.style.backgroundImage = "url('../icons/partly-cloudy-day.svg')";
  }
}

async function setImage() {
  try {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';
    const res = await fetch(url);
    let data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  } catch(e) {
    console.log(e);
    let num = Math.floor(Math.random() * imageLinksLibrary.length);
    document.body.style.backgroundImage = `url(${imageLinksLibrary[num]})`;
  } 
}

getLang();
setPageContent();
//getWeather();
//setImage();
setWeather();

refreshButton.addEventListener('click',  () => {
  arrows.classList.toggle('rotate');
  setImage();
})
langButton.addEventListener('click', langSwitch);
// searchButton.addEventListener('click', () => {
//   console.log('click');
//   getWeather();
// });

function timeInsert() {
  let timeNow = new Date();
  let month = timeNow.getMonth();
  let day = timeNow.getDay();
  let date = timeNow.getDate();
  let hour = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();
  if (lang === 'en') {
    time.textContent = `${dayOfWeekShortEn[day]} ${date} ${monthTitleEn[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    time.textContent = `${dayOfWeekShortRu[day]} ${date} ${monthTitleRu[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  setTimeout(timeInsert, 1000);
}

function langSwitch() {
  if (lang === 'en') {
    langButton.textContent = 'RU';
    inputField.placeholder = 'Найти город'
    lang = 'ru';
    localStorage.setItem('lang','ru');
  } else {
    langButton.textContent = 'EN';
    inputField.placeholder = 'Enter city'
    lang = 'en';
    localStorage.setItem('lang','en');
  }
}

let dayOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
let dayOfWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let dayOfWeekShortEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let dayOfWeekShortRu = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let monthTitleEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthTitleRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

timeInsert();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./scripts/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyLy4vc2Nzcy9pbmRleC5zY3NzIiwid2VicGFjazovL2ZhbmN5LXdlYXRoZXIvLi9zY3JpcHRzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZhbmN5LXdlYXRoZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLGlCQUFpQixRQUFRLEtBQUs7QUFDakc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsVUFBVSxJQUFJLGlCQUFpQjtBQUN2RCwyQkFBMkIsNEJBQTRCO0FBQ3ZELHlCQUF5QixrQ0FBa0M7QUFDM0Qsd0JBQXdCLGdCQUFnQjtBQUN4Qyw0QkFBNEIsbUJBQW1CO0FBQy9DLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGtCQUFrQjtBQUNuRSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlEQUFpRCx1QkFBdUI7QUFDeEUsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0JBQXNCLEdBQUcsS0FBSyxHQUFHLG9CQUFvQixHQUFHLGlDQUFpQyxHQUFHLG9DQUFvQyxHQUFHLG9DQUFvQztBQUNqTSxHQUFHO0FBQ0gsMEJBQTBCLHNCQUFzQixHQUFHLEtBQUssR0FBRyxvQkFBb0IsR0FBRyxpQ0FBaUMsR0FBRyxvQ0FBb0MsR0FBRyxvQ0FBb0M7QUFDak07O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhOzs7Ozs7VUMxTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vc2Nzcy9pbmRleC5zY3NzJ1xyXG5cclxuY29uc3QgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fcmVmcmVzaCcpO1xyXG5jb25zdCBhcnJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uX3JlZnJlc2hfYXJyb3dzJyk7XHJcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG5jb25zdCBsYW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9sYW5nJyk7XHJcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKTtcclxuY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dF9maWVsZCcpO1xyXG5jb25zdCBpbWFnZUxpbmtzTGlicmFyeSA9IFtcclxuICAnaHR0cHM6Ly9jZG4ucGhvdG9zaWdodC5ydS9pbWcvNC9hMmQvNTk0Mjk4MV94bGFyZ2UuanBnJyxcclxuICAnaHR0cHM6Ly9ydXNzaWFucGxhbmVzLm5ldC9pbWFnZXMvdG8yNzEwMDAvMjcwMzMxLmpwZycsXHJcbiAgJ2h0dHBzOi8vcnVzc2lhbnBsYW5lcy5uZXQvaW1hZ2VzL3RvMjY5MDAwLzI2ODM5Mi5qcGcnLFxyXG4gICdodHRwczovL3J1c3NpYW5wbGFuZXMubmV0L2ltYWdlcy90bzIzODAwMC8yMzc0OTguanBnJyxcclxuICAnaHR0cHM6Ly9ydXNzaWFucGxhbmVzLm5ldC9pbWFnZXMvdG8yNzcwMDAvMjc2NTI4LmpwZycsXHJcbiAgJ2h0dHBzOi8vcnVzc2lhbnBsYW5lcy5uZXQvaW1hZ2VzL3RvMTgwMDAwLzE3OTkyMy5qcGcnLFxyXG4gICdodHRwczovL3J1c3NpYW5wbGFuZXMubmV0L2ltYWdlcy90bzI1NDAwMC8yNTMxMzkuanBnJyxcclxuICAnaHR0cHM6Ly9ydXNzaWFucGxhbmVzLm5ldC9pbWFnZXMvdG8yNjMwMDAvMjYyNDc1LmpwZycsXHJcbiAgJ2h0dHBzOi8vcnVzc2lhbnBsYW5lcy5uZXQvaW1hZ2VzL3RvMjc1MDAwLzI3NDE1Ny5qcGcnLFxyXG4gICdodHRwczovL3J1c3NpYW5wbGFuZXMubmV0L2ltYWdlcy90bzI2NzAwMC8yNjY2ODAuanBnJyxcclxuICAnaHR0cHM6Ly9ydXNzaWFucGxhbmVzLm5ldC9pbWFnZXMvdG8yNjcwMDAvMjY2Njk3LmpwZycsXHJcbiAgJ2h0dHBzOi8vcnVzc2lhbnBsYW5lcy5uZXQvaW1hZ2VzL3RvMjQ4MDAwLzI0NzEyNy5qcGcnLFxyXG4gICdodHRwczovL3J1c3NpYW5wbGFuZXMubmV0L2ltYWdlcy90bzI2NjAwMC8yNjUxODIuanBnJyxcclxuICAnaHR0cHM6Ly9ydXNzaWFucGxhbmVzLm5ldC9pbWFnZXMvdG8xNzgwMDAvMTc3ODgxLmpwZycsXHJcbiAgJ2h0dHBzOi8vcnVzc2lhbnBsYW5lcy5uZXQvaW1hZ2VzL3RvMTY2MDAwLzE2NTk1Mi5qcGcnLFxyXG4gICdodHRwczovL3J1c3NpYW5wbGFuZXMubmV0L2ltYWdlcy90bzE0MjAwMC8xNDE3NTkuanBnJ1xyXG5dXHJcblxyXG5jb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHknKTtcclxuY29uc3QgdGVtcE5vdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wX25vdycpO1xyXG5jb25zdCBmZWVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVscycpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHknKTtcclxuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJfZGVzY3JpcHRpb24nKTtcclxuY29uc3Qgd2VhdGhlck5vd0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcl9pbWFnZV9tYWluJyk7XHJcbmNvbnN0IHdlYXRoZXJJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJfaXRlbScpO1xyXG5cclxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG4gIGdldFdlYXRoZXIoKTtcclxuICBzZXRUaW1lb3V0KHNldFdlYXRoZXIoKSwgMTAwMCk7XHJcbn0pXHJcblxyXG5sZXQgbGFuZztcclxubGV0IHRlbXBGbGFnID0gJ2MnO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGFuZygpIHtcclxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmcnKSA9PT0gbnVsbCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCAnZW4nKTtcclxuICAgIGxhbmcgPSBlbjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGFuZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYWdlQ29udGVudCgpIHtcclxuICBpZiAobGFuZyA9PT0gJ2VuJykge1xyXG4gICAgbGFuZ0J1dHRvbi50ZXh0Q29udGVudCA9ICdFTic7XHJcbiAgICBpbnB1dEZpZWxkLnBsYWNlaG9sZGVyID0gJ0VudGVyIGNpdHknXHJcbiAgfSBlbHNlIHtcclxuICAgIGxhbmdCdXR0b24udGV4dENvbnRlbnQgPSAnUlUnO1xyXG4gICAgaW5wdXRGaWVsZC5wbGFjZWhvbGRlciA9ICfQndCw0LnRgtC4INCz0L7RgNC+0LQnXHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdW5zcGxhc2hBY2Nlc3NLZXk9J2NaUUdlQjF5c0RjRFBPWFNvT2daRGU5dXdxVk5RX2NzMGtDcTdVbXpNekEnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcclxuICBsZXQgc2VhcmNoU2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dF9maWVsZCcpO1xyXG4gIGNvbnNvbGUubG9nKHNlYXJjaFNpdHkudGV4dENvbnRlbnQpO1xyXG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7c2VhcmNoU2l0eS52YWx1ZX0mbGFuZz0ke2xhbmd9JmFwcGlkPTk2ZTZiMTk2ZjlmYTc2OTUwZGYyOGMyOWI4ZWFhNTljYDtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3ZWF0aGVyJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb252ZXJ0VGVtcCh0ZW1wKSB7XHJcbiAgaWYgKHRlbXBGbGFnID09PSAnYycpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKHRlbXAgLSAyNzMuMTUpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKCh0ZW1wICogOSAvIDUpIC0gNDU5LjY3KSAvLyBjb252ZXJ0aW5nIEtlbHZpbnMgdG8gRmFocmVuaGVpdFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0V2VhdGhlcigpIHtcclxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2VhdGhlcicpKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBjaXR5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5uYW1lfSwgJHtkYXRhLnN5cy5jb3VudHJ5fWA7XHJcbiAgdGVtcE5vdy50ZXh0Q29udGVudCA9IGAke2NvbnZlcnRUZW1wKGRhdGEubWFpbi50ZW1wKX3CsGA7XHJcbiAgZmVlbHMudGV4dENvbnRlbnQgPSBgJHtjb252ZXJ0VGVtcChkYXRhLm1haW4uZmVlbHNfbGlrZSl9YDtcclxuICB3aW5kLnRleHRDb250ZW50ID0gYCR7ZGF0YS53aW5kLnNwZWVkfWA7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtkYXRhLm1haW4uaHVtaWRpdHl9YDtcclxuICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb259YDtcclxuICBzd2l0Y2goZGF0YS53ZWF0aGVyWzBdLm1haW4pIHtcclxuICAgIGNhc2UoJ1Nub3cnKTpcclxuICAgIHdlYXRoZXJOb3dJY29uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9pY29ucy9zbm93LnN2ZycpXCI7XHJcbiAgICBicmVhaztcclxuICAgIGNhc2UoJ1RodW5kZXJzdG9ybScpOlxyXG4gICAgd2VhdGhlck5vd0ljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2ljb25zL3RodW5kZXJzdG9ybXMuc3ZnJylcIjtcclxuICAgIGJyZWFrO1xyXG4gICAgY2FzZSgnRHJpenpsZScpOlxyXG4gICAgd2VhdGhlck5vd0ljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2ljb25zL2RyaXp6bGUuc3ZnJylcIjtcclxuICAgIGJyZWFrO1xyXG4gICAgY2FzZSgnRm9nJyk6XHJcbiAgICB3ZWF0aGVyTm93SWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi4vaWNvbnMvbWlzdC5zdmcnKVwiO1xyXG4gICAgYnJlYWs7XHJcbiAgICBjYXNlKCdDbGVhbicpOlxyXG4gICAgd2VhdGhlck5vd0ljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2ljb25zL2NsZWFyLWRheS5zdmcnKVwiO1xyXG4gICAgYnJlYWs7XHJcbiAgICBjYXNlKCdDbG91ZHMnKTpcclxuICAgIHdlYXRoZXJOb3dJY29uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9pY29ucy9jbG91ZHkuc3ZnJylcIjtcclxuICAgIGJyZWFrO1xyXG4gICAgY2FzZSgnUmFpbicpOlxyXG4gICAgd2VhdGhlck5vd0ljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2ljb25zL3JhaW4uc3ZnJylcIjtcclxuICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgIHdlYXRoZXJOb3dJY29uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuLi9pY29ucy9wYXJ0bHktY2xvdWR5LWRheS5zdmcnKVwiO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0SW1hZ2UoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbT9xdWVyeT1tb3JuaW5nJmNsaWVudF9pZD1jWlFHZUIxeXNEY0RQT1hTb09nWkRlOXV3cVZOUV9jczBrQ3E3VW16TXpBJztcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtkYXRhLnVybHMucmVndWxhcn0pYDtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGltYWdlTGlua3NMaWJyYXJ5Lmxlbmd0aCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWFnZUxpbmtzTGlicmFyeVtudW1dfSlgO1xyXG4gIH0gXHJcbn1cclxuXHJcbmdldExhbmcoKTtcclxuc2V0UGFnZUNvbnRlbnQoKTtcclxuLy9nZXRXZWF0aGVyKCk7XHJcbi8vc2V0SW1hZ2UoKTtcclxuc2V0V2VhdGhlcigpO1xyXG5cclxucmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICAoKSA9PiB7XHJcbiAgYXJyb3dzLmNsYXNzTGlzdC50b2dnbGUoJ3JvdGF0ZScpO1xyXG4gIHNldEltYWdlKCk7XHJcbn0pXHJcbmxhbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsYW5nU3dpdGNoKTtcclxuLy8gc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG4vLyAgIGdldFdlYXRoZXIoKTtcclxuLy8gfSk7XHJcblxyXG5mdW5jdGlvbiB0aW1lSW5zZXJ0KCkge1xyXG4gIGxldCB0aW1lTm93ID0gbmV3IERhdGUoKTtcclxuICBsZXQgbW9udGggPSB0aW1lTm93LmdldE1vbnRoKCk7XHJcbiAgbGV0IGRheSA9IHRpbWVOb3cuZ2V0RGF5KCk7XHJcbiAgbGV0IGRhdGUgPSB0aW1lTm93LmdldERhdGUoKTtcclxuICBsZXQgaG91ciA9IHRpbWVOb3cuZ2V0SG91cnMoKTtcclxuICBsZXQgbWludXRlcyA9IHRpbWVOb3cuZ2V0TWludXRlcygpO1xyXG4gIGxldCBzZWNvbmRzID0gdGltZU5vdy5nZXRTZWNvbmRzKCk7XHJcbiAgaWYgKGxhbmcgPT09ICdlbicpIHtcclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBgJHtkYXlPZldlZWtTaG9ydEVuW2RheV19ICR7ZGF0ZX0gJHttb250aFRpdGxlRW5bbW9udGhdfSAke2hvdXIudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke21pbnV0ZXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke3NlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBgJHtkYXlPZldlZWtTaG9ydFJ1W2RheV19ICR7ZGF0ZX0gJHttb250aFRpdGxlUnVbbW9udGhdfSAke2hvdXIudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke21pbnV0ZXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke3NlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgfVxyXG4gIFxyXG4gIHNldFRpbWVvdXQodGltZUluc2VydCwgMTAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhbmdTd2l0Y2goKSB7XHJcbiAgaWYgKGxhbmcgPT09ICdlbicpIHtcclxuICAgIGxhbmdCdXR0b24udGV4dENvbnRlbnQgPSAnUlUnO1xyXG4gICAgaW5wdXRGaWVsZC5wbGFjZWhvbGRlciA9ICfQndCw0LnRgtC4INCz0L7RgNC+0LQnXHJcbiAgICBsYW5nID0gJ3J1JztcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5nJywncnUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGFuZ0J1dHRvbi50ZXh0Q29udGVudCA9ICdFTic7XHJcbiAgICBpbnB1dEZpZWxkLnBsYWNlaG9sZGVyID0gJ0VudGVyIGNpdHknXHJcbiAgICBsYW5nID0gJ2VuJztcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5nJywnZW4nKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBkYXlPZldlZWtFbiA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xyXG5sZXQgZGF5T2ZXZWVrUnUgPSBbJ9CS0L7RgdC60YDQtdGB0LXQvdGM0LUnLCAn0J/QvtC90LXQtNC10LvRjNC90LjQuicsICfQktGC0L7RgNC90LjQuicsICfQodGA0LXQtNCwJywgJ9Cn0LXRgtCy0LXRgNCzJywgJ9Cf0Y/RgtC90LjRhtCwJywgJ9Ch0YPQsdCx0L7RgtCwJ107XHJcbmxldCBkYXlPZldlZWtTaG9ydEVuID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcclxubGV0IGRheU9mV2Vla1Nob3J0UnUgPSBbJ9CS0YHQuicsICfQn9C9JywgJ9CS0YInLCAn0KHRgCcsICfQp9GCJywgJ9Cf0YInLCAn0KHQsSddO1xyXG5sZXQgbW9udGhUaXRsZUVuID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XHJcbmxldCBtb250aFRpdGxlUnUgPSBbJ9Cv0L3QstCw0YDRjycsICfQpNC10LLRgNCw0LvRjycsICfQnNCw0YDRgtCwJywgJ9CQ0L/RgNC10LvRjycsICfQnNCw0Y8nLCAn0JjRjtC90Y8nLCAn0JjRjtC70Y8nLCAn0JDQstCz0YPRgdGC0LAnLCAn0KHQtdC90YLRj9Cx0YDRjycsICfQntC60YLRj9Cx0YDRjycsICfQndC+0Y/QsdGA0Y8nLCAn0JTQtdC60LDQsdGA0Y8nXTtcclxuXHJcbnRpbWVJbnNlcnQoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zY3JpcHRzL3NjcmlwdC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=