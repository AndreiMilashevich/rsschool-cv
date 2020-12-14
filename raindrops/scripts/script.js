import '../scss/index.scss';

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





