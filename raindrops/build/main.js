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
let dropStep =  1;
let interval = 10000;
let audioSplash = document.querySelector('.splash');

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
  setTimeout(dropCreate, interval);
}
dropCreate();

function dropsMove() {
  setTimeout( () => {
    let drops = document.querySelectorAll('.drop');
    drops.forEach(function(item) {
      item.style.top = `${item.offsetTop + dropStep}px`;
    })
    dropsMove();
    dropsRemove()
  },40);

}

dropsMove();

function dropsRemove() {
  setTimeout( () => {
    let drops;
    drops = document.querySelectorAll('.drop');
    if (drops[0].offsetTop >= dropField.offsetHeight) {
      drops.forEach((el) => {
        let itemPositionX = el.offsetLeft;
        let itemPositionY = el.offsetTop;
        el.classList.remove('drop');
        el.textContent = '';
        el.classList.add('splash');
        audioSplash.currentTime = 0;
        audioSplash.play();
        el.style.top = `${itemPositionY - 10}px`;
        el.style.left = `${itemPositionX - 30}px`;
        setTimeout(() => {el.remove()}, 100);
      });

    }
    dropsRemove();
  },1000);
}

function addSplash() {
  el.classList.remove('drop');
  el.classList.add('splash');
}

enterButton.addEventListener('click', () => {
  let playerAnswer = answerBoard.textContent;
  let op= document.querySelector('.drop_operator').textContent;
  let first = document.querySelector('.drop_number_one').textContent;
  let second = document.querySelector('.drop_number_two').textContent;
  let answer;
  switch(op) {
    case('+'):
      answer = +first + +second;
      break;
    case('-'):
      answer = +first - +second;
      break;
    case('÷'):
      answer = +first / +second;
      break;
    case('×'):
      answer = +first * +second;
      break;
  }
  if (answer == playerAnswer) {
    score = score + 10;
    scoreValue.textContent = score;
  }

  })









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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYWluZHJvcHMvLi9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzLy4vc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0E0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQkFBMEI7QUFDcEQsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQjtBQUM3QywyQkFBMkIsbUJBQW1CO0FBQzlDLDBCQUEwQixZQUFZO0FBQ3RDLE9BQU87O0FBRVA7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7VUN0S0g7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vc2Nzcy9pbmRleC5zY3NzJztcblxuY29uc3QgYW5zd2VyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5zd2VyX3ZhbHVlJyk7XG5jb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhcicpO1xuY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpO1xuY29uc3QgZHJvcEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfY29udGFpbmVyJyk7XG5jb25zdCBlbnRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRlcicpO1xubGV0IG51bWJlckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtYmVyJyk7XG5sZXQgYW5zd2VyVmFsdWUgPSAnJztcbmxldCBtaW4gPSAxO1xubGV0IG1heCA9IDgwO1xubGV0IHNjb3JlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmVfdmFsdWUnKTtcbmxldCBzY29yZSA9IDA7XG5sZXQgbXVsdE9wZXJhdG9yID0gdHJ1ZTtcbmxldCBkcm9wU3RlcCA9ICAxO1xubGV0IGludGVydmFsID0gMTAwMDA7XG5sZXQgYXVkaW9TcGxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BsYXNoJyk7XG5cbnNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcblxubnVtYmVyQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGlkeCkge1xuICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0gbnVtYmVyQnV0dG9uc1tpZHhdLnRleHRDb250ZW50O1xuICB9KVxufSlcblxuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbn0pXG5cbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9IGFuc3dlckJvYXJkLnRleHRDb250ZW50LnNsaWNlKDAsIC0gMSk7XG59KVxuXG5mdW5jdGlvbiBkcm9wQ3JlYXRlKCkge1xuICBsZXQgZHJvcFBvc2l0aW9uWCA9IE1hdGgucmFuZG9tKCkgKiAoZHJvcEZpZWxkLm9mZnNldFdpZHRoIC0gMjAwKSArIDEwMDtcbiAgbGV0IGZpcnN0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICBsZXQgc2Vjb25kID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZpcnN0IC0gbWluKSArIG1pbik7XG5cbiAgbGV0IG9wID0gKCkgPT4ge1xuICAgIGxldCBtYXg7XG4gICAgaWYgKG11bHRPcGVyYXRvcikge1xuICAgICAgbWF4ID0gNTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF4ID0gMztcbiAgICB9XG5cbiAgICBsZXQgb3BlcmF0b3JOdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkgKyAxKTtcblxuICAgIHN3aXRjaChvcGVyYXRvck51bWJlcikge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gJysnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gJy0nO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gJ8OXJztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuICfDtyc7XG4gICAgfVxuICAgIHJldHVyblxuICB9O1xuXG5cbiAgbGV0IHR3byA9IHNlY29uZCgpO1xuICBsZXQgbyA9IG9wKClcblxuICBmdW5jdGlvbiBleGFtcGxlQ2hlY2soKSB7XG4gICAgaWYgKG8gPT09ICfDtycgJiYgKGZpcnN0ICUgdHdvICE9PSAwKSkge1xuICAgICAgdHdvID0gc2Vjb25kKCk7XG4gICAgICBleGFtcGxlQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBleGFtcGxlQ2hlY2soKTtcblxuICBsZXQgZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgZmlyc3ROdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBzZWNvbmROdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBvcGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGV0IG51bWJlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBmaXJzdE51bWJlci50ZXh0Q29udGVudCA9IGZpcnN0O1xuICBzZWNvbmROdW1iZXIudGV4dENvbnRlbnQgPSB0d287XG4gIG9wZXJhdG9yLnRleHRDb250ZW50ID0gbztcblxuICBmaXJzdE51bWJlci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9udW1iZXJfb25lJyk7XG4gIHNlY29uZE51bWJlci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9udW1iZXJfdHdvJyk7XG4gIG9wZXJhdG9yLmNsYXNzTGlzdC5hZGQoJ2Ryb3BfaXRlbScsICdkcm9wX29wZXJhdG9yJyk7XG4gIG51bWJlcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbnVtYmVyX3dyYXBwZXInKTtcbiAgZHJvcC5jbGFzc0xpc3QuYWRkKCdkcm9wJyk7XG4gIGRyb3Auc3R5bGUubGVmdCA9IGAke2Ryb3BQb3NpdGlvblh9cHhgO1xuXG4gIG51bWJlcldyYXBwZXIuYXBwZW5kKGZpcnN0TnVtYmVyLCBzZWNvbmROdW1iZXIpO1xuICBkcm9wLmFwcGVuZChvcGVyYXRvciwgbnVtYmVyV3JhcHBlcik7XG4gIGRyb3BGaWVsZC5hcHBlbmQoZHJvcCk7XG4gIHNldFRpbWVvdXQoZHJvcENyZWF0ZSwgaW50ZXJ2YWwpO1xufVxuZHJvcENyZWF0ZSgpO1xuXG5mdW5jdGlvbiBkcm9wc01vdmUoKSB7XG4gIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICBsZXQgZHJvcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcCcpO1xuICAgIGRyb3BzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5zdHlsZS50b3AgPSBgJHtpdGVtLm9mZnNldFRvcCArIGRyb3BTdGVwfXB4YDtcbiAgICB9KVxuICAgIGRyb3BzTW92ZSgpO1xuICAgIGRyb3BzUmVtb3ZlKClcbiAgfSw0MCk7XG5cbn1cblxuZHJvcHNNb3ZlKCk7XG5cbmZ1bmN0aW9uIGRyb3BzUmVtb3ZlKCkge1xuICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgbGV0IGRyb3BzO1xuICAgIGRyb3BzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3AnKTtcbiAgICBpZiAoZHJvcHNbMF0ub2Zmc2V0VG9wID49IGRyb3BGaWVsZC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIGRyb3BzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGxldCBpdGVtUG9zaXRpb25YID0gZWwub2Zmc2V0TGVmdDtcbiAgICAgICAgbGV0IGl0ZW1Qb3NpdGlvblkgPSBlbC5vZmZzZXRUb3A7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3AnKTtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3BsYXNoJyk7XG4gICAgICAgIGF1ZGlvU3BsYXNoLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYXVkaW9TcGxhc2gucGxheSgpO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBgJHtpdGVtUG9zaXRpb25ZIC0gMTB9cHhgO1xuICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7aXRlbVBvc2l0aW9uWCAtIDMwfXB4YDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7ZWwucmVtb3ZlKCl9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICB9XG4gICAgZHJvcHNSZW1vdmUoKTtcbiAgfSwxMDAwKTtcbn1cblxuZnVuY3Rpb24gYWRkU3BsYXNoKCkge1xuICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wJyk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoJ3NwbGFzaCcpO1xufVxuXG5lbnRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbGV0IHBsYXllckFuc3dlciA9IGFuc3dlckJvYXJkLnRleHRDb250ZW50O1xuICBsZXQgb3A9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wX29wZXJhdG9yJykudGV4dENvbnRlbnQ7XG4gIGxldCBmaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wX251bWJlcl9vbmUnKS50ZXh0Q29udGVudDtcbiAgbGV0IHNlY29uZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wX251bWJlcl90d28nKS50ZXh0Q29udGVudDtcbiAgbGV0IGFuc3dlcjtcbiAgc3dpdGNoKG9wKSB7XG4gICAgY2FzZSgnKycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0ICsgK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJy0nKTpcbiAgICAgIGFuc3dlciA9ICtmaXJzdCAtICtzZWNvbmQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlKCfDtycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0IC8gK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJ8OXJyk6XG4gICAgICBhbnN3ZXIgPSArZmlyc3QgKiArc2Vjb25kO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGFuc3dlciA9PSBwbGF5ZXJBbnN3ZXIpIHtcbiAgICBzY29yZSA9IHNjb3JlICsgMTA7XG4gICAgc2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IHNjb3JlO1xuICB9XG5cbiAgfSlcblxuXG5cblxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2NyaXB0cy9zY3JpcHQuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9