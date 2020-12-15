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
const quitButton = document.querySelector('.box_controls_quit');
const soundButton = document.querySelector('.box_controls_sound');
const dropField = document.querySelector('.drop_container');
const enterButton = document.querySelector('.enter');
const playButton = document.querySelector('.button_play');
const numberButtons = document.querySelectorAll('.number');
const startPage = document.querySelector('.page_start');
const sound = document.querySelector('.rain');
const audioSplash = document.querySelector('.splash');
const audioAlert = document.querySelector('.alert');
const finalScore = document.querySelector('.final_score');
const finalAnswersCount = document.querySelector('.final_answers');
const finalRightAnswersCount = document.querySelector('.final_answers_right');
const finalAccuracy = document.querySelector('.final_accuracy');
const stat = document.querySelector('.statistics');
const multOperator = document.querySelector('.checkbox_mult');
let answersCount = 0;
let rightAnswersCount = 0;
let accuracy = 0;
let min = 1;
let max = 5;
let scoreValue = document.querySelector('.score_value');
let score = 0;
let scoreStep = 10;
let dropStep;
let bonusPeriod = 20;
let dropCount = 0;

let interval = 3000;

let playGame = false;

playButton.addEventListener('click', startGame);
quitButton.addEventListener('click', stopGame);
soundButton.addEventListener('click', () => {
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause()}
  });

function stopGame() {
  playGame = false;
  sound.pause();
  if (answersCount > 0) {
  accuracy = Math.round((rightAnswersCount / answersCount) * 100);
  } else {
    accuracy = 0;
  }
  if (score < 0) {
    score = 0;
  }
  let drops = document.querySelectorAll('.drop');
  for (let i = 0; i < drops.length; i++) {
    removeOneDrop(drops[i]);
  }
  setTimeout(() => {
    startPage.style.zIndex = '1';
    finalScore.textContent = `Your score: ${score} points!`;
    finalAnswersCount.textContent = `Answers: ${answersCount}`;
    finalRightAnswersCount.textContent = `Right answers: ${rightAnswersCount}`;
    finalAccuracy.textContent = `Accuracy: ${accuracy}%`;
    stat.style.padding = '10px'
  }, 100);
}

function startGame() {
  startPage.style.zIndex = "-1";
  playGame = true;
  dropCreate();
  sound.play();
  dropsMove();
  score = 0;
  answersCount = 0;
  scoreStep = 10;
  rightAnswersCount = 0;
  scoreValue.textContent = score;
  answerBoard.textContent = '';
  dropStep = 1;
}

function numberInput(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const key2 = document.querySelector(`div[data-key2="${e.keyCode}"]`);
  if (this.textContent) {
    answerBoard.textContent += this.textContent.trim();
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
  answerBoard.textContent += key.textContent.trim();
  } else if (key2) {
    answerBoard.textContent += key2.textContent.trim();
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
  dropCount++
  if (playGame) {
  let dropPositionX = Math.random() * (dropField.offsetWidth - 200) + 100;
  let first = Math.floor(Math.random() * (max - min) + min);
  let second = () => Math.floor(Math.random() * (first - min) + min);

  let op = () => {
    let max;
    if (multOperator.checked) {
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
  if (dropCount % bonusPeriod === 0) {
    drop.classList.add('drop_bonus');
  }

  numberWrapper.append(firstNumber, secondNumber);
  drop.append(operator, numberWrapper);
  dropField.append(drop);
  setTimeout(dropCreate, interval);
}
}

function dropsMove() {
  dropStep =  Math.floor(score/200) + 1;
  setTimeout( () => {
    let drops = document.querySelectorAll('.drop');
    drops.forEach(function(item) {
      item.style.top = `${item.offsetTop + dropStep}px`;
    })
    if (playGame) {
      dropsMove();
      dropsRemove()
    }
  },40);
}

function dropsRemove() {

    if (playGame) {
    let drops = document.querySelectorAll('.drop');
    if (drops.length === 0) {
      return
    }
    if (drops[0].offsetTop >= dropField.offsetHeight) {
      for (let i = 0; i < drops.length; i++) {
        removeOneDrop(drops[i]);
      }
    }
  } else {
    return
  }
}

function answerCheck() {
  max++;
  let playerAnswer = answerBoard.textContent;
  let drop = document.querySelector('.drop');
  let op = document.querySelector('.drop_operator').textContent;
  let first = document.querySelector('.drop_number_one').textContent;
  let second = document.querySelector('.drop_number_two').textContent;
  let answer;
  answersCount += 1;
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
    rightAnswersCount++;
    score = score + scoreStep;
    scoreStep++;
    scoreValue.textContent = score;
    if (drop.classList.contains('drop_bonus')) {
      let drops = document.querySelectorAll('.drop');
      for (let i = 0; i < drops.length; i++) {
        removeOneDrop(drops[i]);
      }
      score = score + 30;
    } else {
      removeOneDrop(drop);
    }
  } else {
    score = score - 5;
    scoreValue.textContent = score;
    scoreStep = 10;
    if (score < 0) {
    stopGame();
  } else {
    drop.classList.add('drop_wrong');
    setTimeout(() => {drop.classList.remove('drop_wrong')}, 200)
  }
}

  answerBoard.textContent = '';
}

enterButton.addEventListener('click', answerCheck)

function removeOneDrop(drop) {
  let itemPositionX = drop.offsetLeft;
  let itemPositionY = drop.offsetTop;
  drop.classList.remove('drop');
  drop.classList.remove('drop_bonus');
  drop.textContent = '';
  drop.classList.add('splash');
  audioSplash.currentTime = 0;
  if (!sound.paused) {
    audioSplash.play();
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYWluZHJvcHMvLi9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzLy4vc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0E0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxNQUFNO0FBQ2xELGdEQUFnRCxhQUFhO0FBQzdELDJEQUEyRCxrQkFBa0I7QUFDN0UsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRCxVQUFVO0FBQ2hFLHdEQUF3RCxVQUFVO0FBQ2xFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBCQUEwQjtBQUNwRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixvQ0FBb0M7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLG1CQUFtQjtBQUN6Qyx1QkFBdUIsbUJBQW1CO0FBQzFDLG9CQUFvQixjQUFjO0FBQ2xDOzs7Ozs7Ozs7Ozs7VUN4U0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vc2Nzcy9pbmRleC5zY3NzJztcblxuY29uc3QgYW5zd2VyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5zd2VyX3ZhbHVlJyk7XG5jb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhcicpO1xuY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpO1xuY29uc3QgcXVpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3hfY29udHJvbHNfcXVpdCcpO1xuY29uc3Qgc291bmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94X2NvbnRyb2xzX3NvdW5kJyk7XG5jb25zdCBkcm9wRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9jb250YWluZXInKTtcbmNvbnN0IGVudGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudGVyJyk7XG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9wbGF5Jyk7XG5jb25zdCBudW1iZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm51bWJlcicpO1xuY29uc3Qgc3RhcnRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2Vfc3RhcnQnKTtcbmNvbnN0IHNvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhaW4nKTtcbmNvbnN0IGF1ZGlvU3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwbGFzaCcpO1xuY29uc3QgYXVkaW9BbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpO1xuY29uc3QgZmluYWxTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbF9zY29yZScpO1xuY29uc3QgZmluYWxBbnN3ZXJzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxfYW5zd2VycycpO1xuY29uc3QgZmluYWxSaWdodEFuc3dlcnNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbF9hbnN3ZXJzX3JpZ2h0Jyk7XG5jb25zdCBmaW5hbEFjY3VyYWN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbmFsX2FjY3VyYWN5Jyk7XG5jb25zdCBzdGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRpc3RpY3MnKTtcbmNvbnN0IG11bHRPcGVyYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveF9tdWx0Jyk7XG5sZXQgYW5zd2Vyc0NvdW50ID0gMDtcbmxldCByaWdodEFuc3dlcnNDb3VudCA9IDA7XG5sZXQgYWNjdXJhY3kgPSAwO1xubGV0IG1pbiA9IDE7XG5sZXQgbWF4ID0gNTtcbmxldCBzY29yZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlX3ZhbHVlJyk7XG5sZXQgc2NvcmUgPSAwO1xubGV0IHNjb3JlU3RlcCA9IDEwO1xubGV0IGRyb3BTdGVwO1xubGV0IGJvbnVzUGVyaW9kID0gMjA7XG5sZXQgZHJvcENvdW50ID0gMDtcblxubGV0IGludGVydmFsID0gMzAwMDtcblxubGV0IHBsYXlHYW1lID0gZmFsc2U7XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xucXVpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0b3BHYW1lKTtcbnNvdW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoc291bmQucGF1c2VkKSB7XG4gICAgc291bmQucGxheSgpO1xuICB9IGVsc2Uge1xuICAgIHNvdW5kLnBhdXNlKCl9XG4gIH0pO1xuXG5mdW5jdGlvbiBzdG9wR2FtZSgpIHtcbiAgcGxheUdhbWUgPSBmYWxzZTtcbiAgc291bmQucGF1c2UoKTtcbiAgaWYgKGFuc3dlcnNDb3VudCA+IDApIHtcbiAgYWNjdXJhY3kgPSBNYXRoLnJvdW5kKChyaWdodEFuc3dlcnNDb3VudCAvIGFuc3dlcnNDb3VudCkgKiAxMDApO1xuICB9IGVsc2Uge1xuICAgIGFjY3VyYWN5ID0gMDtcbiAgfVxuICBpZiAoc2NvcmUgPCAwKSB7XG4gICAgc2NvcmUgPSAwO1xuICB9XG4gIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICByZW1vdmVPbmVEcm9wKGRyb3BzW2ldKTtcbiAgfVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzdGFydFBhZ2Uuc3R5bGUuekluZGV4ID0gJzEnO1xuICAgIGZpbmFsU2NvcmUudGV4dENvbnRlbnQgPSBgWW91ciBzY29yZTogJHtzY29yZX0gcG9pbnRzIWA7XG4gICAgZmluYWxBbnN3ZXJzQ291bnQudGV4dENvbnRlbnQgPSBgQW5zd2VyczogJHthbnN3ZXJzQ291bnR9YDtcbiAgICBmaW5hbFJpZ2h0QW5zd2Vyc0NvdW50LnRleHRDb250ZW50ID0gYFJpZ2h0IGFuc3dlcnM6ICR7cmlnaHRBbnN3ZXJzQ291bnR9YDtcbiAgICBmaW5hbEFjY3VyYWN5LnRleHRDb250ZW50ID0gYEFjY3VyYWN5OiAke2FjY3VyYWN5fSVgO1xuICAgIHN0YXQuc3R5bGUucGFkZGluZyA9ICcxMHB4J1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHN0YXJ0UGFnZS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gIHBsYXlHYW1lID0gdHJ1ZTtcbiAgZHJvcENyZWF0ZSgpO1xuICBzb3VuZC5wbGF5KCk7XG4gIGRyb3BzTW92ZSgpO1xuICBzY29yZSA9IDA7XG4gIGFuc3dlcnNDb3VudCA9IDA7XG4gIHNjb3JlU3RlcCA9IDEwO1xuICByaWdodEFuc3dlcnNDb3VudCA9IDA7XG4gIHNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbiAgZHJvcFN0ZXAgPSAxO1xufVxuXG5mdW5jdGlvbiBudW1iZXJJbnB1dChlKSB7XG4gIGNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLWtleT1cIiR7ZS5rZXlDb2RlfVwiXWApO1xuICBjb25zdCBrZXkyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEta2V5Mj1cIiR7ZS5rZXlDb2RlfVwiXWApO1xuICBpZiAodGhpcy50ZXh0Q29udGVudCkge1xuICAgIGFuc3dlckJvYXJkLnRleHRDb250ZW50ICs9IHRoaXMudGV4dENvbnRlbnQudHJpbSgpO1xuICB9IGVsc2UgaWYgKGtleSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBhbnN3ZXJDaGVjaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0Nikge1xuICAgICAgY2xlYXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gOCkge1xuICAgICAgYmFja3NwYWNlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2UgaWYgKGtleSkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCArPSBrZXkudGV4dENvbnRlbnQudHJpbSgpO1xuICB9IGVsc2UgaWYgKGtleTIpIHtcbiAgICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCArPSBrZXkyLnRleHRDb250ZW50LnRyaW0oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbn1cblxuZnVuY3Rpb24gYmFja3NwYWNlKCkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9IGFuc3dlckJvYXJkLnRleHRDb250ZW50LnNsaWNlKDAsIC0gMSk7XG59XG5cbm51bWJlckJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBudW1iZXJJbnB1dClcbn0pXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbnVtYmVySW5wdXQpXG5cbmNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXIpXG5cbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tzcGFjZSlcblxuZnVuY3Rpb24gZHJvcENyZWF0ZSgpIHtcbiAgZHJvcENvdW50KytcbiAgaWYgKHBsYXlHYW1lKSB7XG4gIGxldCBkcm9wUG9zaXRpb25YID0gTWF0aC5yYW5kb20oKSAqIChkcm9wRmllbGQub2Zmc2V0V2lkdGggLSAyMDApICsgMTAwO1xuICBsZXQgZmlyc3QgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gIGxldCBzZWNvbmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZmlyc3QgLSBtaW4pICsgbWluKTtcblxuICBsZXQgb3AgPSAoKSA9PiB7XG4gICAgbGV0IG1heDtcbiAgICBpZiAobXVsdE9wZXJhdG9yLmNoZWNrZWQpIHtcbiAgICAgIG1heCA9IDU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1heCA9IDM7XG4gICAgfVxuXG4gICAgbGV0IG9wZXJhdG9yTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIDEpICsgMSk7XG5cbiAgICBzd2l0Y2gob3BlcmF0b3JOdW1iZXIpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuICcrJztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuICctJztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuICfDlyc7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiAnw7cnO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfTtcblxuICBsZXQgdHdvID0gc2Vjb25kKCk7XG4gIGxldCBvID0gb3AoKVxuXG4gIGZ1bmN0aW9uIGV4YW1wbGVDaGVjaygpIHtcbiAgICBpZiAobyA9PT0gJ8O3JyAmJiAoZmlyc3QgJSB0d28gIT09IDApKSB7XG4gICAgICB0d28gPSBzZWNvbmQoKTtcbiAgICAgIGV4YW1wbGVDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGV4YW1wbGVDaGVjaygpO1xuXG4gIGxldCBkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBmaXJzdE51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGV0IHNlY29uZE51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGV0IG9wZXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsZXQgbnVtYmVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGZpcnN0TnVtYmVyLnRleHRDb250ZW50ID0gZmlyc3Q7XG4gIHNlY29uZE51bWJlci50ZXh0Q29udGVudCA9IHR3bztcbiAgb3BlcmF0b3IudGV4dENvbnRlbnQgPSBvO1xuXG4gIGZpcnN0TnVtYmVyLmNsYXNzTGlzdC5hZGQoJ2Ryb3BfaXRlbScsICdkcm9wX251bWJlcl9vbmUnKTtcbiAgc2Vjb25kTnVtYmVyLmNsYXNzTGlzdC5hZGQoJ2Ryb3BfaXRlbScsICdkcm9wX251bWJlcl90d28nKTtcbiAgb3BlcmF0b3IuY2xhc3NMaXN0LmFkZCgnZHJvcF9pdGVtJywgJ2Ryb3Bfb3BlcmF0b3InKTtcbiAgbnVtYmVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdudW1iZXJfd3JhcHBlcicpO1xuICBkcm9wLmNsYXNzTGlzdC5hZGQoJ2Ryb3AnKTtcbiAgZHJvcC5zdHlsZS5sZWZ0ID0gYCR7ZHJvcFBvc2l0aW9uWH1weGA7XG4gIGlmIChkcm9wQ291bnQgJSBib251c1BlcmlvZCA9PT0gMCkge1xuICAgIGRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcF9ib251cycpO1xuICB9XG5cbiAgbnVtYmVyV3JhcHBlci5hcHBlbmQoZmlyc3ROdW1iZXIsIHNlY29uZE51bWJlcik7XG4gIGRyb3AuYXBwZW5kKG9wZXJhdG9yLCBudW1iZXJXcmFwcGVyKTtcbiAgZHJvcEZpZWxkLmFwcGVuZChkcm9wKTtcbiAgc2V0VGltZW91dChkcm9wQ3JlYXRlLCBpbnRlcnZhbCk7XG59XG59XG5cbmZ1bmN0aW9uIGRyb3BzTW92ZSgpIHtcbiAgZHJvcFN0ZXAgPSAgTWF0aC5mbG9vcihzY29yZS8yMDApICsgMTtcbiAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgZHJvcHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLnN0eWxlLnRvcCA9IGAke2l0ZW0ub2Zmc2V0VG9wICsgZHJvcFN0ZXB9cHhgO1xuICAgIH0pXG4gICAgaWYgKHBsYXlHYW1lKSB7XG4gICAgICBkcm9wc01vdmUoKTtcbiAgICAgIGRyb3BzUmVtb3ZlKClcbiAgICB9XG4gIH0sNDApO1xufVxuXG5mdW5jdGlvbiBkcm9wc1JlbW92ZSgpIHtcblxuICAgIGlmIChwbGF5R2FtZSkge1xuICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgaWYgKGRyb3BzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChkcm9wc1swXS5vZmZzZXRUb3AgPj0gZHJvcEZpZWxkLm9mZnNldEhlaWdodCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZW1vdmVPbmVEcm9wKGRyb3BzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuXG4gIH1cbn1cblxuZnVuY3Rpb24gYW5zd2VyQ2hlY2soKSB7XG4gIG1heCsrO1xuICBsZXQgcGxheWVyQW5zd2VyID0gYW5zd2VyQm9hcmQudGV4dENvbnRlbnQ7XG4gIGxldCBkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AnKTtcbiAgbGV0IG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfb3BlcmF0b3InKS50ZXh0Q29udGVudDtcbiAgbGV0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX29uZScpLnRleHRDb250ZW50O1xuICBsZXQgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX3R3bycpLnRleHRDb250ZW50O1xuICBsZXQgYW5zd2VyO1xuICBhbnN3ZXJzQ291bnQgKz0gMTtcbiAgc3dpdGNoKG9wKSB7XG4gICAgY2FzZSgnKycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0ICsgK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJy0nKTpcbiAgICAgIGFuc3dlciA9ICtmaXJzdCAtICtzZWNvbmQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlKCfDtycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0IC8gK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJ8OXJyk6XG4gICAgICBhbnN3ZXIgPSArZmlyc3QgKiArc2Vjb25kO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGFuc3dlciA9PSBwbGF5ZXJBbnN3ZXIgJiYgcGxheWVyQW5zd2VyICE9PSAnJykge1xuICAgIHJpZ2h0QW5zd2Vyc0NvdW50Kys7XG4gICAgc2NvcmUgPSBzY29yZSArIHNjb3JlU3RlcDtcbiAgICBzY29yZVN0ZXArKztcbiAgICBzY29yZVZhbHVlLnRleHRDb250ZW50ID0gc2NvcmU7XG4gICAgaWYgKGRyb3AuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wX2JvbnVzJykpIHtcbiAgICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZU9uZURyb3AoZHJvcHNbaV0pO1xuICAgICAgfVxuICAgICAgc2NvcmUgPSBzY29yZSArIDMwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVPbmVEcm9wKGRyb3ApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzY29yZSA9IHNjb3JlIC0gNTtcbiAgICBzY29yZVZhbHVlLnRleHRDb250ZW50ID0gc2NvcmU7XG4gICAgc2NvcmVTdGVwID0gMTA7XG4gICAgaWYgKHNjb3JlIDwgMCkge1xuICAgIHN0b3BHYW1lKCk7XG4gIH0gZWxzZSB7XG4gICAgZHJvcC5jbGFzc0xpc3QuYWRkKCdkcm9wX3dyb25nJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7ZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wX3dyb25nJyl9LCAyMDApXG4gIH1cbn1cblxuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9ICcnO1xufVxuXG5lbnRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFuc3dlckNoZWNrKVxuXG5mdW5jdGlvbiByZW1vdmVPbmVEcm9wKGRyb3ApIHtcbiAgbGV0IGl0ZW1Qb3NpdGlvblggPSBkcm9wLm9mZnNldExlZnQ7XG4gIGxldCBpdGVtUG9zaXRpb25ZID0gZHJvcC5vZmZzZXRUb3A7XG4gIGRyb3AuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcCcpO1xuICBkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BfYm9udXMnKTtcbiAgZHJvcC50ZXh0Q29udGVudCA9ICcnO1xuICBkcm9wLmNsYXNzTGlzdC5hZGQoJ3NwbGFzaCcpO1xuICBhdWRpb1NwbGFzaC5jdXJyZW50VGltZSA9IDA7XG4gIGlmICghc291bmQucGF1c2VkKSB7XG4gICAgYXVkaW9TcGxhc2gucGxheSgpO1xuICB9XG5cbiAgZHJvcC5zdHlsZS50b3AgPSBgJHtpdGVtUG9zaXRpb25ZIC0gMTB9cHhgO1xuICBkcm9wLnN0eWxlLmxlZnQgPSBgJHtpdGVtUG9zaXRpb25YIC0gMzB9cHhgO1xuICBzZXRUaW1lb3V0KCgpID0+IHtkcm9wLnJlbW92ZSgpfSwgMTAwKTtcbn1cblxuXG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zY3JpcHRzL3NjcmlwdC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=