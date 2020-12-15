import '../scss/index.scss';

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





