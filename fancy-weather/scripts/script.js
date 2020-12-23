import '../scss/index.scss'

const refreshButton = document.querySelector('.button_refresh');
const arrows = document.querySelector('.button_refresh_arrows');
const time = document.querySelector('.time');
const langButton = document.querySelector('.button_lang');
const inputField = document.querySelector('.input_field');


let lang;

function getLang() {
  if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
    lang = en;
  } else {
    lang = localStorage.getItem('lang');
  }
}

function setPageContent() {
  if (lang === 'en') {
    langButton.textContent = 'EN';
    inputField.placeholder = 'Enter city'
  } else {
    langButton.textContent = 'RU';
    inputField.placeholder = 'Найти город'
  }
}

let unsplashAccessKey='cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';

// function getWeather() {
//   //const url = 'api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=96e6b196f9fa76950df28c29b8eaa59c';
//   const url ='api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid=96e6b196f9fa76950df28c29b8eaa59c';
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.urls.regular);
//     })
//     .catch( err => console.log(err)
//     );
// }

async function getWeatherTest() {
  const url ='api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid=96e6b196f9fa76950df28c29b8eaa59c';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.urls.regular);
}

// async function getLinkToImage() {
//   const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data.urls.regular);
//   //document.body.backgroundImage = `url(${data})`;
// }

getLang();
setPageContent();
//getWeather();
//getLinkToImage();
getWeatherTest()

refreshButton.addEventListener('click',  () => arrows.classList.toggle('rotate'))
langButton.addEventListener('click', langSwitch);

function timeInsert() {
  let timeNow = new Date();
  let month = timeNow.getMonth();
  let day = timeNow.getDay();
  let date = timeNow.getDate();
  let hour = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();
  if (lang === 'en') {
    time.textContent = `${dayOfWeekShortEn[day]} ${date} ${monthTitleEn[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    time.textContent = `${dayOfWeekShortRu[day]} ${date} ${monthTitleRu[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  setTimeout(timeInsert, 1000);
}

function langSwitch() {
  if (lang === 'en') {
    langButton.textContent = 'RU';
    inputField.placeholder = 'Найти город'
    lang = 'ru';
    localStorage.setItem('lang','ru');
  } else {
    langButton.textContent = 'EN';
    inputField.placeholder = 'Enter city'
    lang = 'en';
    localStorage.setItem('lang','en');
  }
}

let dayOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
let dayOfWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let dayOfWeekShortEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let dayOfWeekShortRu = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let monthTitleEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthTitleRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

timeInsert();