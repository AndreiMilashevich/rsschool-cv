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
const playButton = document.querySelector('.button_play');
const numberButtons = document.querySelectorAll('.number');
const startPage = document.querySelector('.page_start');
let answerValue = '';
let min = 1;
let max = 20;
let scoreValue = document.querySelector('.score_value');
let score = 0;
let multOperator = true;
let dropStep =  1;
let interval = 10000;
let audioSplash = document.querySelector('.splash');
let playGame = false;

scoreValue.textContent = score;

playButton.addEventListener('click', play);

function play() {
  startPage.style.top = "100%";
  playGame = true;
}

function numberInput(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const key2 = document.querySelector(`div[data-key2="${e.keyCode}"]`);
  if (this.textContent) {
    answerBoard.textContent += this.textContent;
  } else if (key) {
    if (e.keyCode === 13) {
      answerCheck();
      return;
    } else if (e.keyCode === 46) {
      clear();
      return;
    } else if (e.keyCode === 8) {
      backspace();
      return;
    }
  } else if (key) {
  answerBoard.textContent += key.textContent;
  }  else if (key2) {
    answerBoard.textContent += key2.textContent;
  }
}

function clear() {
  answerBoard.textContent = '';
}

function backspace() {
  answerBoard.textContent = answerBoard.textContent.slice(0, - 1);
}

numberButtons.forEach(function(item) {
  item.addEventListener('click', numberInput)
})

window.addEventListener('keydown', numberInput)

clearButton.addEventListener('click', clear)

deleteButton.addEventListener('click', backspace)

function dropCreate() {
  if (playGame) {
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
    let drops = document.querySelectorAll('.drop');
    if (drops[0].offsetTop >= dropField.offsetHeight) {
      for (let i = 0; i < drops.length; i++) {
        removeOneDrop(drops[i]);
      }
    }
    dropsRemove();
  },1000);
}

function answerCheck() {
  let playerAnswer = answerBoard.textContent;
  let drop = document.querySelector('.drop');
  let op = document.querySelector('.drop_operator').textContent;
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
  if (answer == playerAnswer && playerAnswer !== '') {
    score = score + 10;
    scoreValue.textContent = score;
    removeOneDrop(drop);
  } else {
    score = score - 5;
    scoreValue.textContent = score;
    drop.classList.add('drop_wrong');
    setTimeout(() => {drop.classList.remove('drop_wrong')}, 200)
  }
  answerBoard.textContent = '';
}

enterButton.addEventListener('click', answerCheck)

function removeOneDrop(drop) {
  let itemPositionX = drop.offsetLeft;
  let itemPositionY = drop.offsetTop;
  drop.classList.remove('drop');
  drop.textContent = '';
  drop.classList.add('splash');
  audioSplash.currentTime = 0;
  audioSplash.play();
  drop.style.top = `${itemPositionY - 10}px`;
  drop.style.left = `${itemPositionX - 30}px`;
  setTimeout(() => {drop.remove()}, 100);
}







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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYWluZHJvcHMvLi9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzLy4vc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0E0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELFVBQVU7QUFDaEUsd0RBQXdELFVBQVU7QUFDbEU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQkFBMEI7QUFDcEQsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixvQ0FBb0M7QUFDMUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDLHVCQUF1QixtQkFBbUI7QUFDMUMsb0JBQW9CLGNBQWM7QUFDbEM7Ozs7Ozs7Ozs7OztVQ2xOQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuLi9zY3NzL2luZGV4LnNjc3MnO1xuXG5jb25zdCBhbnN3ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbnN3ZXJfdmFsdWUnKTtcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJyk7XG5jb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJyk7XG5jb25zdCBkcm9wRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9jb250YWluZXInKTtcbmNvbnN0IGVudGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudGVyJyk7XG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9wbGF5Jyk7XG5jb25zdCBudW1iZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm51bWJlcicpO1xuY29uc3Qgc3RhcnRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2Vfc3RhcnQnKTtcbmxldCBhbnN3ZXJWYWx1ZSA9ICcnO1xubGV0IG1pbiA9IDE7XG5sZXQgbWF4ID0gMjA7XG5sZXQgc2NvcmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZV92YWx1ZScpO1xubGV0IHNjb3JlID0gMDtcbmxldCBtdWx0T3BlcmF0b3IgPSB0cnVlO1xubGV0IGRyb3BTdGVwID0gIDE7XG5sZXQgaW50ZXJ2YWwgPSAxMDAwMDtcbmxldCBhdWRpb1NwbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGxhc2gnKTtcbmxldCBwbGF5R2FtZSA9IGZhbHNlO1xuXG5zY29yZVZhbHVlLnRleHRDb250ZW50ID0gc2NvcmU7XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5KTtcblxuZnVuY3Rpb24gcGxheSgpIHtcbiAgc3RhcnRQYWdlLnN0eWxlLnRvcCA9IFwiMTAwJVwiO1xuICBwbGF5R2FtZSA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIG51bWJlcklucHV0KGUpIHtcbiAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEta2V5PVwiJHtlLmtleUNvZGV9XCJdYCk7XG4gIGNvbnN0IGtleTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1rZXkyPVwiJHtlLmtleUNvZGV9XCJdYCk7XG4gIGlmICh0aGlzLnRleHRDb250ZW50KSB7XG4gICAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0gdGhpcy50ZXh0Q29udGVudDtcbiAgfSBlbHNlIGlmIChrZXkpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgYW5zd2VyQ2hlY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gNDYpIHtcbiAgICAgIGNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDgpIHtcbiAgICAgIGJhY2tzcGFjZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIGlmIChrZXkpIHtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0ga2V5LnRleHRDb250ZW50O1xuICB9ICBlbHNlIGlmIChrZXkyKSB7XG4gICAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0ga2V5Mi50ZXh0Q29udGVudDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbn1cblxuZnVuY3Rpb24gYmFja3NwYWNlKCkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9IGFuc3dlckJvYXJkLnRleHRDb250ZW50LnNsaWNlKDAsIC0gMSk7XG59XG5cbm51bWJlckJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBudW1iZXJJbnB1dClcbn0pXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbnVtYmVySW5wdXQpXG5cbmNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXIpXG5cbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tzcGFjZSlcblxuZnVuY3Rpb24gZHJvcENyZWF0ZSgpIHtcbiAgaWYgKHBsYXlHYW1lKSB7XG4gIGxldCBkcm9wUG9zaXRpb25YID0gTWF0aC5yYW5kb20oKSAqIChkcm9wRmllbGQub2Zmc2V0V2lkdGggLSAyMDApICsgMTAwO1xuICBsZXQgZmlyc3QgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gIGxldCBzZWNvbmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZmlyc3QgLSBtaW4pICsgbWluKTtcblxuICBsZXQgb3AgPSAoKSA9PiB7XG4gICAgbGV0IG1heDtcbiAgICBpZiAobXVsdE9wZXJhdG9yKSB7XG4gICAgICBtYXggPSA1O1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXggPSAzO1xuICAgIH1cblxuICAgIGxldCBvcGVyYXRvck51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSAxKSArIDEpO1xuXG4gICAgc3dpdGNoKG9wZXJhdG9yTnVtYmVyKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiAnKyc7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiAnLSc7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiAnw5cnO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gJ8O3JztcbiAgICB9XG4gICAgcmV0dXJuXG4gIH07XG5cbiAgbGV0IHR3byA9IHNlY29uZCgpO1xuICBsZXQgbyA9IG9wKClcblxuICBmdW5jdGlvbiBleGFtcGxlQ2hlY2soKSB7XG4gICAgaWYgKG8gPT09ICfDtycgJiYgKGZpcnN0ICUgdHdvICE9PSAwKSkge1xuICAgICAgdHdvID0gc2Vjb25kKCk7XG4gICAgICBleGFtcGxlQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBleGFtcGxlQ2hlY2soKTtcblxuICBsZXQgZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgZmlyc3ROdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBzZWNvbmROdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBvcGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGV0IG51bWJlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBmaXJzdE51bWJlci50ZXh0Q29udGVudCA9IGZpcnN0O1xuICBzZWNvbmROdW1iZXIudGV4dENvbnRlbnQgPSB0d287XG4gIG9wZXJhdG9yLnRleHRDb250ZW50ID0gbztcblxuICBmaXJzdE51bWJlci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9udW1iZXJfb25lJyk7XG4gIHNlY29uZE51bWJlci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9udW1iZXJfdHdvJyk7XG4gIG9wZXJhdG9yLmNsYXNzTGlzdC5hZGQoJ2Ryb3BfaXRlbScsICdkcm9wX29wZXJhdG9yJyk7XG4gIG51bWJlcldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbnVtYmVyX3dyYXBwZXInKTtcbiAgZHJvcC5jbGFzc0xpc3QuYWRkKCdkcm9wJyk7XG4gIGRyb3Auc3R5bGUubGVmdCA9IGAke2Ryb3BQb3NpdGlvblh9cHhgO1xuXG4gIG51bWJlcldyYXBwZXIuYXBwZW5kKGZpcnN0TnVtYmVyLCBzZWNvbmROdW1iZXIpO1xuICBkcm9wLmFwcGVuZChvcGVyYXRvciwgbnVtYmVyV3JhcHBlcik7XG4gIGRyb3BGaWVsZC5hcHBlbmQoZHJvcCk7XG4gIHNldFRpbWVvdXQoZHJvcENyZWF0ZSwgaW50ZXJ2YWwpO1xufVxufVxuXG5kcm9wQ3JlYXRlKCk7XG5cbmZ1bmN0aW9uIGRyb3BzTW92ZSgpIHtcbiAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgZHJvcHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLnN0eWxlLnRvcCA9IGAke2l0ZW0ub2Zmc2V0VG9wICsgZHJvcFN0ZXB9cHhgO1xuICAgIH0pXG4gICAgZHJvcHNNb3ZlKCk7XG4gICAgZHJvcHNSZW1vdmUoKVxuICB9LDQwKTtcbn1cblxuZHJvcHNNb3ZlKCk7XG5cbmZ1bmN0aW9uIGRyb3BzUmVtb3ZlKCkge1xuICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgbGV0IGRyb3BzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3AnKTtcbiAgICBpZiAoZHJvcHNbMF0ub2Zmc2V0VG9wID49IGRyb3BGaWVsZC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlT25lRHJvcChkcm9wc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyb3BzUmVtb3ZlKCk7XG4gIH0sMTAwMCk7XG59XG5cbmZ1bmN0aW9uIGFuc3dlckNoZWNrKCkge1xuICBsZXQgcGxheWVyQW5zd2VyID0gYW5zd2VyQm9hcmQudGV4dENvbnRlbnQ7XG4gIGxldCBkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AnKTtcbiAgbGV0IG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfb3BlcmF0b3InKS50ZXh0Q29udGVudDtcbiAgbGV0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX29uZScpLnRleHRDb250ZW50O1xuICBsZXQgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX3R3bycpLnRleHRDb250ZW50O1xuICBsZXQgYW5zd2VyO1xuICBzd2l0Y2gob3ApIHtcbiAgICBjYXNlKCcrJyk6XG4gICAgICBhbnN3ZXIgPSArZmlyc3QgKyArc2Vjb25kO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSgnLScpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0IC0gK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJ8O3Jyk6XG4gICAgICBhbnN3ZXIgPSArZmlyc3QgLyArc2Vjb25kO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSgnw5cnKTpcbiAgICAgIGFuc3dlciA9ICtmaXJzdCAqICtzZWNvbmQ7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoYW5zd2VyID09IHBsYXllckFuc3dlciAmJiBwbGF5ZXJBbnN3ZXIgIT09ICcnKSB7XG4gICAgc2NvcmUgPSBzY29yZSArIDEwO1xuICAgIHNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcbiAgICByZW1vdmVPbmVEcm9wKGRyb3ApO1xuICB9IGVsc2Uge1xuICAgIHNjb3JlID0gc2NvcmUgLSA1O1xuICAgIHNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcbiAgICBkcm9wLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bfd3JvbmcnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Bfd3JvbmcnKX0sIDIwMClcbiAgfVxuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9ICcnO1xufVxuXG5lbnRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFuc3dlckNoZWNrKVxuXG5mdW5jdGlvbiByZW1vdmVPbmVEcm9wKGRyb3ApIHtcbiAgbGV0IGl0ZW1Qb3NpdGlvblggPSBkcm9wLm9mZnNldExlZnQ7XG4gIGxldCBpdGVtUG9zaXRpb25ZID0gZHJvcC5vZmZzZXRUb3A7XG4gIGRyb3AuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcCcpO1xuICBkcm9wLnRleHRDb250ZW50ID0gJyc7XG4gIGRyb3AuY2xhc3NMaXN0LmFkZCgnc3BsYXNoJyk7XG4gIGF1ZGlvU3BsYXNoLmN1cnJlbnRUaW1lID0gMDtcbiAgYXVkaW9TcGxhc2gucGxheSgpO1xuICBkcm9wLnN0eWxlLnRvcCA9IGAke2l0ZW1Qb3NpdGlvblkgLSAxMH1weGA7XG4gIGRyb3Auc3R5bGUubGVmdCA9IGAke2l0ZW1Qb3NpdGlvblggLSAzMH1weGA7XG4gIHNldFRpbWVvdXQoKCkgPT4ge2Ryb3AucmVtb3ZlKCl9LCAxMDApO1xufVxuXG5cblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvc2NyaXB0LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==