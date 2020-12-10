import '../scss/index.scss';

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






