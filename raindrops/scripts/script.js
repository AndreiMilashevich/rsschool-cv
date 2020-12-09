import '../scss/index.scss';

const answerBoard = document.querySelector('.answer_value');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const enterButton = document.querySelector('.enter');
let numberButtons = document.querySelectorAll('.number');
let answerValue = '';


numberButtons.forEach(function(item, idx) {
  item.addEventListener('click', function() {
    console.log('click')
    answerBoard.textContent += numberButtons[idx].textContent;
  })
})

clearButton.addEventListener('click', function() {
  answerBoard.textContent = '';
})

deleteButton.addEventListener('click', function() {
  answerBoard.textContent = answerBoard.textContent.slice(0, - 1);
})





