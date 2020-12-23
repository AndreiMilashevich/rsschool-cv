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
const inputField = document.querySelector('.input_field');


let lang;

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

// function getWeather() {
//   //const url = 'api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=96e6b196f9fa76950df28c29b8eaa59c';
//   const url ='api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid=96e6b196f9fa76950df28c29b8eaa59c';
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.urls.regular);
//     })
//     .catch( err => console.log(err)
//     );
// }

async function getWeatherTest() {
  const url ='api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid=96e6b196f9fa76950df28c29b8eaa59c';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.urls.regular);
}

// async function getLinkToImage() {
//   const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data.urls.regular);
//   //document.body.backgroundImage = `url(${data})`;
// }

getLang();
setPageContent();
//getWeather();
//getLinkToImage();
getWeatherTest()

refreshButton.addEventListener('click',  () => arrows.classList.toggle('rotate'))
langButton.addEventListener('click', langSwitch);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyLy4vc2Nzcy9pbmRleC5zY3NzIiwid2VicGFjazovL2ZhbmN5LXdlYXRoZXIvLi9zY3JpcHRzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZhbmN5LXdlYXRoZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mYW5jeS13ZWF0aGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEtBQUs7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzQkFBc0IsR0FBRyxLQUFLLEdBQUcsb0JBQW9CLEdBQUcsaUNBQWlDLEdBQUcsb0NBQW9DLEdBQUcsb0NBQW9DO0FBQ2pNLEdBQUc7QUFDSCwwQkFBMEIsc0JBQXNCLEdBQUcsS0FBSyxHQUFHLG9CQUFvQixHQUFHLGlDQUFpQyxHQUFHLG9DQUFvQyxHQUFHLG9DQUFvQztBQUNqTTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGE7Ozs7OztVQzFHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuLi9zY3NzL2luZGV4LnNjc3MnXHJcblxyXG5jb25zdCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9yZWZyZXNoJyk7XHJcbmNvbnN0IGFycm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fcmVmcmVzaF9hcnJvd3MnKTtcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XHJcbmNvbnN0IGxhbmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uX2xhbmcnKTtcclxuY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dF9maWVsZCcpO1xyXG5cclxuXHJcbmxldCBsYW5nO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGFuZygpIHtcclxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmcnKSA9PT0gbnVsbCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCAnZW4nKTtcclxuICAgIGxhbmcgPSBlbjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGFuZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYWdlQ29udGVudCgpIHtcclxuICBpZiAobGFuZyA9PT0gJ2VuJykge1xyXG4gICAgbGFuZ0J1dHRvbi50ZXh0Q29udGVudCA9ICdFTic7XHJcbiAgICBpbnB1dEZpZWxkLnBsYWNlaG9sZGVyID0gJ0VudGVyIGNpdHknXHJcbiAgfSBlbHNlIHtcclxuICAgIGxhbmdCdXR0b24udGV4dENvbnRlbnQgPSAnUlUnO1xyXG4gICAgaW5wdXRGaWVsZC5wbGFjZWhvbGRlciA9ICfQndCw0LnRgtC4INCz0L7RgNC+0LQnXHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdW5zcGxhc2hBY2Nlc3NLZXk9J2NaUUdlQjF5c0RjRFBPWFNvT2daRGU5dXdxVk5RX2NzMGtDcTdVbXpNekEnO1xyXG5cclxuLy8gZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcclxuLy8gICAvL2NvbnN0IHVybCA9ICdhcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9TWluc2smYXBwaWQ9OTZlNmIxOTZmOWZhNzY5NTBkZjI4YzI5YjhlYWE1OWMnO1xyXG4vLyAgIGNvbnN0IHVybCA9J2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT1Mb25kb24sdWsmY2FsbGJhY2s9dGVzdCZhcHBpZD05NmU2YjE5NmY5ZmE3Njk1MGRmMjhjMjliOGVhYTU5Yyc7XHJcbi8vICAgZmV0Y2godXJsKVxyXG4vLyAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbi8vICAgICAudGhlbihkYXRhID0+IHtcclxuLy8gICAgICAgY29uc29sZS5sb2coZGF0YS51cmxzLnJlZ3VsYXIpO1xyXG4vLyAgICAgfSlcclxuLy8gICAgIC5jYXRjaCggZXJyID0+IGNvbnNvbGUubG9nKGVycilcclxuLy8gICAgICk7XHJcbi8vIH1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJUZXN0KCkge1xyXG4gIGNvbnN0IHVybCA9J2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT1Mb25kb24sdWsmY2FsbGJhY2s9dGVzdCZhcHBpZD05NmU2YjE5NmY5ZmE3Njk1MGRmMjhjMjliOGVhYTU5Yyc7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyhkYXRhLnVybHMucmVndWxhcik7XHJcbn1cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIGdldExpbmtUb0ltYWdlKCkge1xyXG4vLyAgIGNvbnN0IHVybCA9ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbT9xdWVyeT1tb3JuaW5nJmNsaWVudF9pZD1jWlFHZUIxeXNEY0RQT1hTb09nWkRlOXV3cVZOUV9jczBrQ3E3VW16TXpBJztcclxuLy8gICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4vLyAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4vLyAgIGNvbnNvbGUubG9nKGRhdGEudXJscy5yZWd1bGFyKTtcclxuLy8gICAvL2RvY3VtZW50LmJvZHkuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2RhdGF9KWA7XHJcbi8vIH1cclxuXHJcbmdldExhbmcoKTtcclxuc2V0UGFnZUNvbnRlbnQoKTtcclxuLy9nZXRXZWF0aGVyKCk7XHJcbi8vZ2V0TGlua1RvSW1hZ2UoKTtcclxuZ2V0V2VhdGhlclRlc3QoKVxyXG5cclxucmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICAoKSA9PiBhcnJvd3MuY2xhc3NMaXN0LnRvZ2dsZSgncm90YXRlJykpXHJcbmxhbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsYW5nU3dpdGNoKTtcclxuXHJcbmZ1bmN0aW9uIHRpbWVJbnNlcnQoKSB7XHJcbiAgbGV0IHRpbWVOb3cgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCBtb250aCA9IHRpbWVOb3cuZ2V0TW9udGgoKTtcclxuICBsZXQgZGF5ID0gdGltZU5vdy5nZXREYXkoKTtcclxuICBsZXQgZGF0ZSA9IHRpbWVOb3cuZ2V0RGF0ZSgpO1xyXG4gIGxldCBob3VyID0gdGltZU5vdy5nZXRIb3VycygpO1xyXG4gIGxldCBtaW51dGVzID0gdGltZU5vdy5nZXRNaW51dGVzKCk7XHJcbiAgbGV0IHNlY29uZHMgPSB0aW1lTm93LmdldFNlY29uZHMoKTtcclxuICBpZiAobGFuZyA9PT0gJ2VuJykge1xyXG4gICAgdGltZS50ZXh0Q29udGVudCA9IGAke2RheU9mV2Vla1Nob3J0RW5bZGF5XX0gJHtkYXRlfSAke21vbnRoVGl0bGVFblttb250aF19ICR7aG91ci50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7bWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7c2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZS50ZXh0Q29udGVudCA9IGAke2RheU9mV2Vla1Nob3J0UnVbZGF5XX0gJHtkYXRlfSAke21vbnRoVGl0bGVSdVttb250aF19ICR7aG91ci50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7bWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7c2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcclxuICB9XHJcbiAgXHJcbiAgc2V0VGltZW91dCh0aW1lSW5zZXJ0LCAxMDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbGFuZ1N3aXRjaCgpIHtcclxuICBpZiAobGFuZyA9PT0gJ2VuJykge1xyXG4gICAgbGFuZ0J1dHRvbi50ZXh0Q29udGVudCA9ICdSVSc7XHJcbiAgICBpbnB1dEZpZWxkLnBsYWNlaG9sZGVyID0gJ9Cd0LDQudGC0Lgg0LPQvtGA0L7QtCdcclxuICAgIGxhbmcgPSAncnUnO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCdydScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsYW5nQnV0dG9uLnRleHRDb250ZW50ID0gJ0VOJztcclxuICAgIGlucHV0RmllbGQucGxhY2Vob2xkZXIgPSAnRW50ZXIgY2l0eSdcclxuICAgIGxhbmcgPSAnZW4nO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCdlbicpO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGRheU9mV2Vla0VuID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XHJcbmxldCBkYXlPZldlZWtSdSA9IFsn0JLQvtGB0LrRgNC10YHQtdC90YzQtScsICfQn9C+0L3QtdC00LXQu9GM0L3QuNC6JywgJ9CS0YLQvtGA0L3QuNC6JywgJ9Ch0YDQtdC00LAnLCAn0KfQtdGC0LLQtdGA0LMnLCAn0J/Rj9GC0L3QuNGG0LAnLCAn0KHRg9Cx0LHQvtGC0LAnXTtcclxubGV0IGRheU9mV2Vla1Nob3J0RW4gPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xyXG5sZXQgZGF5T2ZXZWVrU2hvcnRSdSA9IFsn0JLRgdC6JywgJ9Cf0L0nLCAn0JLRgicsICfQodGAJywgJ9Cn0YInLCAn0J/RgicsICfQodCxJ107XHJcbmxldCBtb250aFRpdGxlRW4gPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcclxubGV0IG1vbnRoVGl0bGVSdSA9IFsn0K/QvdCy0LDRgNGPJywgJ9Ck0LXQstGA0LDQu9GPJywgJ9Cc0LDRgNGC0LAnLCAn0JDQv9GA0LXQu9GPJywgJ9Cc0LDRjycsICfQmNGO0L3RjycsICfQmNGO0LvRjycsICfQkNCy0LPRg9GB0YLQsCcsICfQodC10L3RgtGP0LHRgNGPJywgJ9Ce0LrRgtGP0LHRgNGPJywgJ9Cd0L7Rj9Cx0YDRjycsICfQlNC10LrQsNCx0YDRjyddO1xyXG5cclxudGltZUluc2VydCgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvc2NyaXB0LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==