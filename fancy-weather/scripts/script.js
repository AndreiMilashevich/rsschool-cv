import '../scss/index.scss'

const refreshButton = document.querySelector('.button_refresh');
const arrows = document.querySelector('.button_refresh_arrows');
const time = document.querySelector('.time');

refreshButton.addEventListener('click',  () => arrows.classList.toggle('rotate'))

function timeInsert() {
  let timeNow = new Date();
  let month = timeNow.getMonth();
  let day = timeNow.getDay();
  let date = timeNow.getDate();
  let hour = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();
  time.textContent = `${dayOfWeekSHort[day]} ${date} ${monthTitle[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  setTimeout(timeInsert, 1000);
}

let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
let dayOfWeekSHort = ['Sun', 'Mon', 'Tue', 'Wednesday', 'Thu', 'Fri', 'Sat'];
let monthTitle = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

timeInsert();