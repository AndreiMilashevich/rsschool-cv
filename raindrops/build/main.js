/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/index.scss":
/*!*************************!*
  !*** ./scss/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./scripts/script.js":
/*!***************************!*
  !*** ./scripts/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./scss/index.scss");


const answerBoard = document.querySelector('.answer_value');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const dropField = document.querySelector('.drop_container');
const enterButton = document.querySelector('.enter');
let numberButtons = document.querySelectorAll('.number');
let answerValue = '';
let min = 1;
let max = 80;
let scoreValue = document.querySelector('.score_value');
let score = 0;
let multOperator = true;
let dropStep = 0;



scoreValue.textContent = score;

numberButtons.forEach(function(item, idx) {
  item.addEventListener('click', function() {
    answerBoard.textContent += numberButtons[idx].textContent;
  })
})

clearButton.addEventListener('click', function() {
  answerBoard.textContent = '';
})

deleteButton.addEventListener('click', function() {
  answerBoard.textContent = answerBoard.textContent.slice(0, - 1);
})

function dropCreate() {
  let dropPositionX = Math.random() * (dropField.offsetWidth - 200) + 100;
  let first = Math.floor(Math.random() * (max - min) + min);
  let second = () => Math.floor(Math.random() * (first - min) + min);

  let op = () => {
    let max;
    if (multOperator) {
      max = 5;
    } else {
      max = 3;
    }

    let operatorNumber = Math.floor(Math.random() * (max - 1) + 1);

    switch(operatorNumber) {
      case 1:
        return '+';
      case 2:
        return '-';
      case 3:
        return '×';
      case 4:
        return '÷';
    }
    return
  };


  let two = second();
  let o = op()

  function exampleCheck() {
    if (o === '÷' && (first % two !== 0)) {
      console.log('do not divide');
      two = second();
      exampleCheck();
    }
  }

  exampleCheck();

  let drop = document.createElement('div');
  let firstNumber = document.createElement('span');
  let secondNumber = document.createElement('span');
  let operator = document.createElement('span');
  let numberWrapper = document.createElement('div');

  firstNumber.textContent = first;
  secondNumber.textContent = two;
  operator.textContent = o;

  firstNumber.classList.add('drop_item', 'drop_number_one');
  secondNumber.classList.add('drop_item', 'drop_number_two');
  operator.classList.add('drop_item', 'drop_operator');
  numberWrapper.classList.add('number_wrapper');
  drop.classList.add('drop');
  drop.style.left = `${dropPositionX}px`;

  numberWrapper.append(firstNumber, secondNumber);
  drop.append(operator, numberWrapper);
  dropField.append(drop);
}

dropCreate();
dropCreate();
dropCreate();
dropCreate();
dropCreate();

function dropsMove() {
  setTimeout( () => {
    let drops = document.querySelectorAll('.drop');
    drops.forEach(function(item) {
      let position = item.offsetTop;
      item.style.top = `${position + dropStep}px`;
    })
    dropsMove();
  },40);

}

dropsMove(dropStep);








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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYWluZHJvcHMvLi9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzLy4vc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0E0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvQkFBb0I7QUFDOUMsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7Ozs7Ozs7Ozs7OztVQ3BIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuLi9zY3NzL2luZGV4LnNjc3MnO1xuXG5jb25zdCBhbnN3ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbnN3ZXJfdmFsdWUnKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJyk7XG5jb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJyk7XG5jb25zdCBkcm9wRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9jb250YWluZXInKTtcbmNvbnN0IGVudGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudGVyJyk7XG5sZXQgbnVtYmVyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW1iZXInKTtcbmxldCBhbnN3ZXJWYWx1ZSA9ICcnO1xubGV0IG1pbiA9IDE7XG5sZXQgbWF4ID0gODA7XG5sZXQgc2NvcmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZV92YWx1ZScpO1xubGV0IHNjb3JlID0gMDtcbmxldCBtdWx0T3BlcmF0b3IgPSB0cnVlO1xubGV0IGRyb3BTdGVwID0gMDtcblxuXG5cbnNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcblxubnVtYmVyQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGlkeCkge1xuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0gbnVtYmVyQnV0dG9uc1tpZHhdLnRleHRDb250ZW50O1xuICB9KVxufSlcblxuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbn0pXG5cbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9IGFuc3dlckJvYXJkLnRleHRDb250ZW50LnNsaWNlKDAsIC0gMSk7XG59KVxuXG5mdW5jdGlvbiBkcm9wQ3JlYXRlKCkge1xuICBsZXQgZHJvcFBvc2l0aW9uWCA9IE1hdGgucmFuZG9tKCkgKiAoZHJvcEZpZWxkLm9mZnNldFdpZHRoIC0gMjAwKSArIDEwMDtcbiAgbGV0IGZpcnN0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICBsZXQgc2Vjb25kID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZpcnN0IC0gbWluKSArIG1pbik7XG5cbiAgbGV0IG9wID0gKCkgPT4ge1xuICAgIGxldCBtYXg7XG4gICAgaWYgKG11bHRPcGVyYXRvcikge1xuICAgICAgbWF4ID0gNTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF4ID0gMztcbiAgICB9XG5cbiAgICBsZXQgb3BlcmF0b3JOdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkgKyAxKTtcblxuICAgIHN3aXRjaChvcGVyYXRvck51bWJlcikge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gJysnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gJy0nO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gJ8OXJztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuICfDtyc7XG4gICAgfVxuICAgIHJldHVyblxuICB9O1xuXG5cbiAgbGV0IHR3byA9IHNlY29uZCgpO1xuICBsZXQgbyA9IG9wKClcblxuICBmdW5jdGlvbiBleGFtcGxlQ2hlY2soKSB7XG4gICAgaWYgKG8gPT09ICfDtycgJiYgKGZpcnN0ICUgdHdvICE9PSAwKSkge1xuICAgICAgY29uc29sZS5sb2coJ2RvIG5vdCBkaXZpZGUnKTtcbiAgICAgIHR3byA9IHNlY29uZCgpO1xuICAgICAgZXhhbXBsZUNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZXhhbXBsZUNoZWNrKCk7XG5cbiAgbGV0IGRyb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGZpcnN0TnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsZXQgc2Vjb25kTnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsZXQgb3BlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBudW1iZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgZmlyc3ROdW1iZXIudGV4dENvbnRlbnQgPSBmaXJzdDtcbiAgc2Vjb25kTnVtYmVyLnRleHRDb250ZW50ID0gdHdvO1xuICBvcGVyYXRvci50ZXh0Q29udGVudCA9IG87XG5cbiAgZmlyc3ROdW1iZXIuY2xhc3NMaXN0LmFkZCgnZHJvcF9pdGVtJywgJ2Ryb3BfbnVtYmVyX29uZScpO1xuICBzZWNvbmROdW1iZXIuY2xhc3NMaXN0LmFkZCgnZHJvcF9pdGVtJywgJ2Ryb3BfbnVtYmVyX3R3bycpO1xuICBvcGVyYXRvci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9vcGVyYXRvcicpO1xuICBudW1iZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ251bWJlcl93cmFwcGVyJyk7XG4gIGRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcCcpO1xuICBkcm9wLnN0eWxlLmxlZnQgPSBgJHtkcm9wUG9zaXRpb25YfXB4YDtcblxuICBudW1iZXJXcmFwcGVyLmFwcGVuZChmaXJzdE51bWJlciwgc2Vjb25kTnVtYmVyKTtcbiAgZHJvcC5hcHBlbmQob3BlcmF0b3IsIG51bWJlcldyYXBwZXIpO1xuICBkcm9wRmllbGQuYXBwZW5kKGRyb3ApO1xufVxuXG5kcm9wQ3JlYXRlKCk7XG5kcm9wQ3JlYXRlKCk7XG5kcm9wQ3JlYXRlKCk7XG5kcm9wQ3JlYXRlKCk7XG5kcm9wQ3JlYXRlKCk7XG5cbmZ1bmN0aW9uIGRyb3BzTW92ZSgpIHtcbiAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgZHJvcHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBsZXQgcG9zaXRpb24gPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgIGl0ZW0uc3R5bGUudG9wID0gYCR7cG9zaXRpb24gKyBkcm9wU3RlcH1weGA7XG4gICAgfSlcbiAgICBkcm9wc01vdmUoKTtcbiAgfSw0MCk7XG5cbn1cblxuZHJvcHNNb3ZlKGRyb3BTdGVwKTtcblxuXG5cblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvc2NyaXB0LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==