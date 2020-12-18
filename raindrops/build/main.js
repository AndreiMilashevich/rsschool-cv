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

// fields
const dropField = document.querySelector('.drop_container');
const startPage = document.querySelector('.page_start');
const answerBoard = document.querySelector('.answer_value');
let scoreValue = document.querySelector('.score_value');
let wave  = document.querySelector('.wave');

// buttons
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const quitButton = document.querySelector('.box_controls_quit');
const soundButton = document.querySelector('.box_controls_sound');
const enterButton = document.querySelector('.enter');
const playButton = document.querySelector('.button_play');
const numberButtons = document.querySelectorAll('.number');
const multOperator = document.querySelector('.checkbox_mult');

// sounds
const sound = document.querySelector('.rain');
const audioSplash = document.querySelector('.splash');
const audioAlert = document.querySelector('.alert');

// statistics DOM
const finalScore = document.querySelector('.final_score');
const finalAnswersCount = document.querySelector('.final_answers');
const finalRightAnswersCount = document.querySelector('.final_answers_right');
const finalAccuracy = document.querySelector('.final_accuracy');
const stat = document.querySelector('.statistics');

// statistics variables
let answersCount = 0;
let rightAnswersCount = 0;
let accuracy = 0;

//service variables
let min = 1; // min value in expression
let max = 5; //max value in expression
let score = 0; //score
let scoreStep = 10; //score increment
let dropStep; // how much drop move per iteration
let bonusPeriod = 20; // how often bonus drop shows
let dropCount = 0;
let interval = 3000; // time interval between drops
let playGame = false;
let notCatchCount = 0;

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
  sound.volume = 0.2;
  dropsMove();
  score = 0;
  answersCount = 0;
  scoreStep = 10;
  rightAnswersCount = 0;
  scoreValue.textContent = score;
  answerBoard.textContent = '';
  dropStep = 1;
}

// enter answer
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
  let first = Math.floor(Math.random() * (max - min) + min); //first number in expression
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
  let o = op();

  //check can divide or not
  function exampleCheck() {
    if (o === '÷' && (first % two !== 0)) {
      two = second();
      exampleCheck();
    }
  }

  exampleCheck();

  //create drops in DOM
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
  dropStep =  Math.floor(score/200) + 1; //change drop's speed
  setTimeout( () => {
    let drops = document.querySelectorAll('.drop');
    drops.forEach(function(item) {
      item.style.top = `${item.offsetTop + dropStep}px`;
    })
    if (playGame) {
      dropsMove();
      dropsRemove()
    }
  },40); // because need 25 frames per second.
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
      notCatchCount++;
      if (notCatchCount === 1) {
        wave.style.height = '35%';
      } else if (notCatchCount === 2) {
        wave.style.height = '45%';
      }
      if (notCatchCount >= 3) {
        stopGame();
      }
    }
  } else {
    return
  }
}

function answerCheck() {
  max++; //increment expression's difficult
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
    audioAlert.currentTime = 0;
    audioAlert.volume = 1;
    audioAlert.play(); // error
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
    audioSplash.currentTime = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYWluZHJvcHMvLi9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzLy4vc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcmFpbmRyb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JhaW5kcm9wcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0E0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWixZQUFZO0FBQ1osY0FBYztBQUNkLG1CQUFtQjtBQUNuQixhQUFhO0FBQ2IscUJBQXFCO0FBQ3JCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE1BQU07QUFDbEQsZ0RBQWdELGFBQWE7QUFDN0QsMkRBQTJELGtCQUFrQjtBQUM3RSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRCxVQUFVO0FBQ2hFLHdEQUF3RCxVQUFVO0FBQ2xFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMEJBQTBCO0FBQ3BELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsS0FBSztBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLHNCQUFzQixvQ0FBb0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6Qyx1QkFBdUIsbUJBQW1CO0FBQzFDLG9CQUFvQixjQUFjO0FBQ2xDOzs7Ozs7Ozs7Ozs7VUNoVUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi4vc2Nzcy9pbmRleC5zY3NzJztcbi8vIGZpZWxkc1xuY29uc3QgZHJvcEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfY29udGFpbmVyJyk7XG5jb25zdCBzdGFydFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9zdGFydCcpO1xuY29uc3QgYW5zd2VyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5zd2VyX3ZhbHVlJyk7XG5sZXQgc2NvcmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZV92YWx1ZScpO1xubGV0IHdhdmUgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndhdmUnKTtcblxuLy8gYnV0dG9uc1xuY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXInKTtcbmNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUnKTtcbmNvbnN0IHF1aXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94X2NvbnRyb2xzX3F1aXQnKTtcbmNvbnN0IHNvdW5kQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveF9jb250cm9sc19zb3VuZCcpO1xuY29uc3QgZW50ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW50ZXInKTtcbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uX3BsYXknKTtcbmNvbnN0IG51bWJlckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtYmVyJyk7XG5jb25zdCBtdWx0T3BlcmF0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3hfbXVsdCcpO1xuXG4vLyBzb3VuZHNcbmNvbnN0IHNvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhaW4nKTtcbmNvbnN0IGF1ZGlvU3BsYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwbGFzaCcpO1xuY29uc3QgYXVkaW9BbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpO1xuXG4vLyBzdGF0aXN0aWNzIERPTVxuY29uc3QgZmluYWxTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbF9zY29yZScpO1xuY29uc3QgZmluYWxBbnN3ZXJzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxfYW5zd2VycycpO1xuY29uc3QgZmluYWxSaWdodEFuc3dlcnNDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbF9hbnN3ZXJzX3JpZ2h0Jyk7XG5jb25zdCBmaW5hbEFjY3VyYWN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbmFsX2FjY3VyYWN5Jyk7XG5jb25zdCBzdGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRpc3RpY3MnKTtcblxuLy8gc3RhdGlzdGljcyB2YXJpYWJsZXNcbmxldCBhbnN3ZXJzQ291bnQgPSAwO1xubGV0IHJpZ2h0QW5zd2Vyc0NvdW50ID0gMDtcbmxldCBhY2N1cmFjeSA9IDA7XG5cbi8vc2VydmljZSB2YXJpYWJsZXNcbmxldCBtaW4gPSAxOyAvLyBtaW4gdmFsdWUgaW4gZXhwcmVzc2lvblxubGV0IG1heCA9IDU7IC8vbWF4IHZhbHVlIGluIGV4cHJlc3Npb25cbmxldCBzY29yZSA9IDA7IC8vc2NvcmVcbmxldCBzY29yZVN0ZXAgPSAxMDsgLy9zY29yZSBpbmNyZW1lbnRcbmxldCBkcm9wU3RlcDsgLy8gaG93IG11Y2ggZHJvcCBtb3ZlIHBlciBpdGVyYXRpb25cbmxldCBib251c1BlcmlvZCA9IDIwOyAvLyBob3cgb2Z0ZW4gYm9udXMgZHJvcCBzaG93c1xubGV0IGRyb3BDb3VudCA9IDA7XG5sZXQgaW50ZXJ2YWwgPSAzMDAwOyAvLyB0aW1lIGludGVydmFsIGJldHdlZW4gZHJvcHNcbmxldCBwbGF5R2FtZSA9IGZhbHNlO1xubGV0IG5vdENhdGNoQ291bnQgPSAwO1xuXG5wbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKTtcbnF1aXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdG9wR2FtZSk7XG5zb3VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKHNvdW5kLnBhdXNlZCkge1xuICAgIHNvdW5kLnBsYXkoKTtcbiAgfSBlbHNlIHtcbiAgICBzb3VuZC5wYXVzZSgpfVxuICB9KTtcblxuZnVuY3Rpb24gc3RvcEdhbWUoKSB7XG4gIHBsYXlHYW1lID0gZmFsc2U7XG4gIHNvdW5kLnBhdXNlKCk7XG4gIGlmIChhbnN3ZXJzQ291bnQgPiAwKSB7XG4gIGFjY3VyYWN5ID0gTWF0aC5yb3VuZCgocmlnaHRBbnN3ZXJzQ291bnQgLyBhbnN3ZXJzQ291bnQpICogMTAwKTtcbiAgfSBlbHNlIHtcbiAgICBhY2N1cmFjeSA9IDA7XG4gIH1cbiAgaWYgKHNjb3JlIDwgMCkge1xuICAgIHNjb3JlID0gMDtcbiAgfVxuICBsZXQgZHJvcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVtb3ZlT25lRHJvcChkcm9wc1tpXSk7XG4gIH1cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc3RhcnRQYWdlLnN0eWxlLnpJbmRleCA9ICcxJztcbiAgICBmaW5hbFNjb3JlLnRleHRDb250ZW50ID0gYFlvdXIgc2NvcmU6ICR7c2NvcmV9IHBvaW50cyFgO1xuICAgIGZpbmFsQW5zd2Vyc0NvdW50LnRleHRDb250ZW50ID0gYEFuc3dlcnM6ICR7YW5zd2Vyc0NvdW50fWA7XG4gICAgZmluYWxSaWdodEFuc3dlcnNDb3VudC50ZXh0Q29udGVudCA9IGBSaWdodCBhbnN3ZXJzOiAke3JpZ2h0QW5zd2Vyc0NvdW50fWA7XG4gICAgZmluYWxBY2N1cmFjeS50ZXh0Q29udGVudCA9IGBBY2N1cmFjeTogJHthY2N1cmFjeX0lYDtcbiAgICBzdGF0LnN0eWxlLnBhZGRpbmcgPSAnMTBweCdcbiAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBzdGFydFBhZ2Uuc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICBwbGF5R2FtZSA9IHRydWU7XG4gIGRyb3BDcmVhdGUoKTtcbiAgc291bmQucGxheSgpO1xuICBzb3VuZC52b2x1bWUgPSAwLjI7XG4gIGRyb3BzTW92ZSgpO1xuICBzY29yZSA9IDA7XG4gIGFuc3dlcnNDb3VudCA9IDA7XG4gIHNjb3JlU3RlcCA9IDEwO1xuICByaWdodEFuc3dlcnNDb3VudCA9IDA7XG4gIHNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBzY29yZTtcbiAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgPSAnJztcbiAgZHJvcFN0ZXAgPSAxO1xufVxuXG4vLyBlbnRlciBhbnN3ZXJcbmZ1bmN0aW9uIG51bWJlcklucHV0KGUpIHtcbiAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEta2V5PVwiJHtlLmtleUNvZGV9XCJdYCk7XG4gIGNvbnN0IGtleTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS1rZXkyPVwiJHtlLmtleUNvZGV9XCJdYCk7XG4gIGlmICh0aGlzLnRleHRDb250ZW50KSB7XG4gICAgYW5zd2VyQm9hcmQudGV4dENvbnRlbnQgKz0gdGhpcy50ZXh0Q29udGVudC50cmltKCk7XG4gIH0gZWxzZSBpZiAoa2V5KSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGFuc3dlckNoZWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQ2KSB7XG4gICAgICBjbGVhcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA4KSB7XG4gICAgICBiYWNrc3BhY2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoa2V5KSB7XG4gIGFuc3dlckJvYXJkLnRleHRDb250ZW50ICs9IGtleS50ZXh0Q29udGVudC50cmltKCk7XG4gIH0gZWxzZSBpZiAoa2V5Mikge1xuICAgIGFuc3dlckJvYXJkLnRleHRDb250ZW50ICs9IGtleTIudGV4dENvbnRlbnQudHJpbSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyKCkge1xuICBhbnN3ZXJCb2FyZC50ZXh0Q29udGVudCA9ICcnO1xufVxuXG5mdW5jdGlvbiBiYWNrc3BhY2UoKSB7XG4gIGFuc3dlckJvYXJkLnRleHRDb250ZW50ID0gYW5zd2VyQm9hcmQudGV4dENvbnRlbnQuc2xpY2UoMCwgLSAxKTtcbn1cblxubnVtYmVyQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG51bWJlcklucHV0KVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBudW1iZXJJbnB1dClcblxuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhcilcblxuZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja3NwYWNlKVxuXG5mdW5jdGlvbiBkcm9wQ3JlYXRlKCkge1xuICBkcm9wQ291bnQrK1xuICBpZiAocGxheUdhbWUpIHtcbiAgbGV0IGRyb3BQb3NpdGlvblggPSBNYXRoLnJhbmRvbSgpICogKGRyb3BGaWVsZC5vZmZzZXRXaWR0aCAtIDIwMCkgKyAxMDA7XG4gIGxldCBmaXJzdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTsgLy9maXJzdCBudW1iZXIgaW4gZXhwcmVzc2lvblxuICBsZXQgc2Vjb25kID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZpcnN0IC0gbWluKSArIG1pbik7XG5cbiAgbGV0IG9wID0gKCkgPT4ge1xuICAgIGxldCBtYXg7XG4gICAgaWYgKG11bHRPcGVyYXRvci5jaGVja2VkKSB7XG4gICAgICBtYXggPSA1O1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXggPSAzO1xuICAgIH1cblxuICAgIGxldCBvcGVyYXRvck51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSAxKSArIDEpO1xuXG4gICAgc3dpdGNoKG9wZXJhdG9yTnVtYmVyKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiAnKyc7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiAnLSc7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiAnw5cnO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gJ8O3JztcbiAgICB9XG4gICAgcmV0dXJuXG4gIH07XG5cbiAgbGV0IHR3byA9IHNlY29uZCgpO1xuICBsZXQgbyA9IG9wKCk7XG5cbiAgLy9jaGVjayBjYW4gZGl2aWRlIG9yIG5vdFxuICBmdW5jdGlvbiBleGFtcGxlQ2hlY2soKSB7XG4gICAgaWYgKG8gPT09ICfDtycgJiYgKGZpcnN0ICUgdHdvICE9PSAwKSkge1xuICAgICAgdHdvID0gc2Vjb25kKCk7XG4gICAgICBleGFtcGxlQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBleGFtcGxlQ2hlY2soKTtcblxuICAvL2NyZWF0ZSBkcm9wcyBpbiBET01cbiAgbGV0IGRyb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGZpcnN0TnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsZXQgc2Vjb25kTnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsZXQgb3BlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxldCBudW1iZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgZmlyc3ROdW1iZXIudGV4dENvbnRlbnQgPSBmaXJzdDtcbiAgc2Vjb25kTnVtYmVyLnRleHRDb250ZW50ID0gdHdvO1xuICBvcGVyYXRvci50ZXh0Q29udGVudCA9IG87XG5cbiAgZmlyc3ROdW1iZXIuY2xhc3NMaXN0LmFkZCgnZHJvcF9pdGVtJywgJ2Ryb3BfbnVtYmVyX29uZScpO1xuICBzZWNvbmROdW1iZXIuY2xhc3NMaXN0LmFkZCgnZHJvcF9pdGVtJywgJ2Ryb3BfbnVtYmVyX3R3bycpO1xuICBvcGVyYXRvci5jbGFzc0xpc3QuYWRkKCdkcm9wX2l0ZW0nLCAnZHJvcF9vcGVyYXRvcicpO1xuICBudW1iZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ251bWJlcl93cmFwcGVyJyk7XG4gIGRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcCcpO1xuICBkcm9wLnN0eWxlLmxlZnQgPSBgJHtkcm9wUG9zaXRpb25YfXB4YDtcbiAgaWYgKGRyb3BDb3VudCAlIGJvbnVzUGVyaW9kID09PSAwKSB7XG4gICAgZHJvcC5jbGFzc0xpc3QuYWRkKCdkcm9wX2JvbnVzJyk7XG4gIH1cblxuICBudW1iZXJXcmFwcGVyLmFwcGVuZChmaXJzdE51bWJlciwgc2Vjb25kTnVtYmVyKTtcbiAgZHJvcC5hcHBlbmQob3BlcmF0b3IsIG51bWJlcldyYXBwZXIpO1xuICBkcm9wRmllbGQuYXBwZW5kKGRyb3ApO1xuICBzZXRUaW1lb3V0KGRyb3BDcmVhdGUsIGludGVydmFsKTtcbn1cbn1cblxuZnVuY3Rpb24gZHJvcHNNb3ZlKCkge1xuICBkcm9wU3RlcCA9ICBNYXRoLmZsb29yKHNjb3JlLzIwMCkgKyAxOyAvL2NoYW5nZSBkcm9wJ3Mgc3BlZWRcbiAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgZHJvcHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLnN0eWxlLnRvcCA9IGAke2l0ZW0ub2Zmc2V0VG9wICsgZHJvcFN0ZXB9cHhgO1xuICAgIH0pXG4gICAgaWYgKHBsYXlHYW1lKSB7XG4gICAgICBkcm9wc01vdmUoKTtcbiAgICAgIGRyb3BzUmVtb3ZlKClcbiAgICB9XG4gIH0sNDApOyAvLyBiZWNhdXNlIG5lZWQgMjUgZnJhbWVzIHBlciBzZWNvbmQuXG59XG5cbmZ1bmN0aW9uIGRyb3BzUmVtb3ZlKCkge1xuICBpZiAocGxheUdhbWUpIHtcbiAgICBsZXQgZHJvcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcCcpO1xuICAgIGlmIChkcm9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZHJvcHNbMF0ub2Zmc2V0VG9wID49IGRyb3BGaWVsZC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVtb3ZlT25lRHJvcChkcm9wc1tpXSk7XG4gICAgICB9XG4gICAgICBub3RDYXRjaENvdW50Kys7XG4gICAgICBpZiAobm90Q2F0Y2hDb3VudCA9PT0gMSkge1xuICAgICAgICB3YXZlLnN0eWxlLmhlaWdodCA9ICczNSUnO1xuICAgICAgfSBlbHNlIGlmIChub3RDYXRjaENvdW50ID09PSAyKSB7XG4gICAgICAgIHdhdmUuc3R5bGUuaGVpZ2h0ID0gJzQ1JSc7XG4gICAgICB9XG4gICAgICBpZiAobm90Q2F0Y2hDb3VudCA+PSAzKSB7XG4gICAgICAgIHN0b3BHYW1lKCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVyblxuICB9XG59XG5cbmZ1bmN0aW9uIGFuc3dlckNoZWNrKCkge1xuICBtYXgrKzsgLy9pbmNyZW1lbnQgZXhwcmVzc2lvbidzIGRpZmZpY3VsdFxuICBsZXQgcGxheWVyQW5zd2VyID0gYW5zd2VyQm9hcmQudGV4dENvbnRlbnQ7XG4gIGxldCBkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3AnKTtcbiAgbGV0IG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfb3BlcmF0b3InKS50ZXh0Q29udGVudDtcbiAgbGV0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX29uZScpLnRleHRDb250ZW50O1xuICBsZXQgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3BfbnVtYmVyX3R3bycpLnRleHRDb250ZW50O1xuICBsZXQgYW5zd2VyO1xuICBhbnN3ZXJzQ291bnQgKz0gMTtcbiAgc3dpdGNoKG9wKSB7XG4gICAgY2FzZSgnKycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0ICsgK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJy0nKTpcbiAgICAgIGFuc3dlciA9ICtmaXJzdCAtICtzZWNvbmQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlKCfDtycpOlxuICAgICAgYW5zd2VyID0gK2ZpcnN0IC8gK3NlY29uZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UoJ8OXJyk6XG4gICAgICBhbnN3ZXIgPSArZmlyc3QgKiArc2Vjb25kO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGFuc3dlciA9PSBwbGF5ZXJBbnN3ZXIgJiYgcGxheWVyQW5zd2VyICE9PSAnJykge1xuICAgIHJpZ2h0QW5zd2Vyc0NvdW50Kys7XG4gICAgc2NvcmUgPSBzY29yZSArIHNjb3JlU3RlcDtcbiAgICBzY29yZVN0ZXArKztcbiAgICBzY29yZVZhbHVlLnRleHRDb250ZW50ID0gc2NvcmU7XG4gICAgaWYgKGRyb3AuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wX2JvbnVzJykpIHtcbiAgICAgIGxldCBkcm9wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wJyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZU9uZURyb3AoZHJvcHNbaV0pO1xuICAgICAgfVxuICAgICAgc2NvcmUgPSBzY29yZSArIDMwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVPbmVEcm9wKGRyb3ApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzY29yZSA9IHNjb3JlIC0gNTtcbiAgICBzY29yZVZhbHVlLnRleHRDb250ZW50ID0gc2NvcmU7XG4gICAgc2NvcmVTdGVwID0gMTA7XG4gICAgaWYgKHNjb3JlIDwgMCkge1xuICAgIHN0b3BHYW1lKCk7XG4gIH0gZWxzZSB7XG4gICAgYXVkaW9BbGVydC5jdXJyZW50VGltZSA9IDA7XG4gICAgYXVkaW9BbGVydC52b2x1bWUgPSAxO1xuICAgIGF1ZGlvQWxlcnQucGxheSgpOyAvLyBlcnJvclxuICAgIGRyb3AuY2xhc3NMaXN0LmFkZCgnZHJvcF93cm9uZycpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcF93cm9uZycpfSwgMjAwKVxuICB9XG59XG4gIGFuc3dlckJvYXJkLnRleHRDb250ZW50ID0gJyc7XG59XG5cbmVudGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYW5zd2VyQ2hlY2spXG5cbmZ1bmN0aW9uIHJlbW92ZU9uZURyb3AoZHJvcCkge1xuICBsZXQgaXRlbVBvc2l0aW9uWCA9IGRyb3Aub2Zmc2V0TGVmdDtcbiAgbGV0IGl0ZW1Qb3NpdGlvblkgPSBkcm9wLm9mZnNldFRvcDtcbiAgZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wJyk7XG4gIGRyb3AuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcF9ib251cycpO1xuICBkcm9wLnRleHRDb250ZW50ID0gJyc7XG4gIGRyb3AuY2xhc3NMaXN0LmFkZCgnc3BsYXNoJyk7XG4gIGF1ZGlvU3BsYXNoLmN1cnJlbnRUaW1lID0gMDtcbiAgaWYgKCFzb3VuZC5wYXVzZWQpIHtcbiAgICBhdWRpb1NwbGFzaC5jdXJyZW50VGltZSA9IDA7XG4gICAgYXVkaW9TcGxhc2gucGxheSgpO1xuICB9XG4gIGRyb3Auc3R5bGUudG9wID0gYCR7aXRlbVBvc2l0aW9uWSAtIDEwfXB4YDtcbiAgZHJvcC5zdHlsZS5sZWZ0ID0gYCR7aXRlbVBvc2l0aW9uWCAtIDMwfXB4YDtcbiAgc2V0VGltZW91dCgoKSA9PiB7ZHJvcC5yZW1vdmUoKX0sIDEwMCk7XG59XG5cblxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2NyaXB0cy9zY3JpcHQuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9