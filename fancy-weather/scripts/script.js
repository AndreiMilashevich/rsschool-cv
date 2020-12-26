import '../scss/index.scss'

const refreshButton = document.querySelector('.button_refresh');
const arrows = document.querySelector('.button_refresh_arrows');
const time = document.querySelector('.time');
const langButton = document.querySelector('.button_lang');
const searchButton = document.querySelector('.submit');
const inputField = document.querySelector('.input_field');
const imageLinksLibrary = [
  'https://cdn.photosight.ru/img/4/a2d/5942981_xlarge.jpg',
  'https://russianplanes.net/images/to271000/270331.jpg',
  'https://russianplanes.net/images/to269000/268392.jpg',
  'https://russianplanes.net/images/to238000/237498.jpg',
  'https://russianplanes.net/images/to277000/276528.jpg',
  'https://russianplanes.net/images/to180000/179923.jpg',
  'https://russianplanes.net/images/to254000/253139.jpg',
  'https://russianplanes.net/images/to263000/262475.jpg',
  'https://russianplanes.net/images/to275000/274157.jpg',
  'https://russianplanes.net/images/to267000/266680.jpg',
  'https://russianplanes.net/images/to267000/266697.jpg',
  'https://russianplanes.net/images/to248000/247127.jpg',
  'https://russianplanes.net/images/to266000/265182.jpg',
  'https://russianplanes.net/images/to178000/177881.jpg',
  'https://russianplanes.net/images/to166000/165952.jpg',
  'https://russianplanes.net/images/to142000/141759.jpg'
];

const cityDOM = document.querySelector('.city');
const tempNow = document.querySelector('.temp_now');
const feels = document.querySelector('.feels');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather_description');
const weatherNowIcon = document.querySelector('.weather_image_main');
const weatherItem = document.querySelector('.weather_item');

let city = 'Minsk'
let countryCode = '';
let latitude = 53.9000;
let longitude = 27.5667;

let coordOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude
  console.log(`Latitude : ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  getMap();
  getWeatherByCoord();
  
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  getPlace();
  getWeatherByCity()
}

navigator.geolocation.getCurrentPosition(success, error, coordOptions);

//getPlace();

searchButton.addEventListener('click', searchCity);

function searchCity() {
  city = inputField.value;
  getWeatherByCity(city);
}


let lang;
let tempFlag = 'c';

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

async function getWeatherByCoord() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  setWeather(data);
}

async function getWeatherByCity() {
  let searchSity = document.querySelector('.input_field');
  console.log(searchSity.textContent);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  latitude = data.coord.lat;
  longitude = data.coord.lon;
  console.log(data);
  setWeather(data);
  getMap();
}

function convertTemp(temp) {
  if (tempFlag === 'c') {
    return Math.round(temp - 273.15)
  } else {
    return Math.round((temp * 9 / 5) - 459.67) // converting Kelvins to Fahrenheit
  }
}

function setWeather(data) {
  cityDOM.textContent = `${data.name}, ${data.sys.country}`;
  tempNow.textContent = `${convertTemp(data.main.temp)}°`;
  feels.textContent = `${convertTemp(data.main.feels_like)}`;
  wind.textContent = `${data.wind.speed}`;
  humidity.textContent = `${data.main.humidity}`;
  weatherDescription.textContent = `${data.weather[0].description}`;
  switch(data.weather[0].main) {
    case('Snow'):
    weatherNowIcon.style.backgroundImage = "url('../icons/snow.svg')";
    break;
    case('Thunderstorm'):
    weatherNowIcon.style.backgroundImage = "url('../icons/thunderstorms.svg')";
    break;
    case('Drizzle'):
    weatherNowIcon.style.backgroundImage = "url('../icons/drizzle.svg')";
    break;
    case('Fog'):
    weatherNowIcon.style.backgroundImage = "url('../icons/mist.svg')";
    break;
    case('Clean'):
    weatherNowIcon.style.backgroundImage = "url('../icons/clear-day.svg')";
    break;
    case('Clouds'):
    weatherNowIcon.style.backgroundImage = "url('../icons/cloudy.svg')";
    break;
    case('Rain'):
    weatherNowIcon.style.backgroundImage = "url('../icons/rain.svg')";
    break;
    default:
    weatherNowIcon.style.backgroundImage = "url('../icons/partly-cloudy-day.svg')";
  }
}

async function getPlace() {
  try {
  const url = 'https://ipinfo.io/json?token=cb5f57499775d8';
  const res = await fetch(url);
  const data = await res.json();
  city = data.city;
  countryCode = data.country;
  let loc = data.loc.split(',');
  latitude = loc[0];
  longitude = loc[1];
  getMap();
  getWeatherByCity();
} catch {
  console.log('Error, do not get your IP');
  getMap();
  }
}

async function setImage() {
  try {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';
    const res = await fetch(url);
    let data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  } catch(e) {
    console.log(e);
    let num = Math.floor(Math.random() * imageLinksLibrary.length);
    document.body.style.backgroundImage = `url(${imageLinksLibrary[num]})`;
  } 
}

getLang();
setPageContent();
setImage();

refreshButton.addEventListener('click',  () => {
  arrows.classList.toggle('rotate');
  setImage();
})
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

function getMap() {
  
  let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9objQ4NDIiLCJhIjoiY2tqNGUwd3dyMGp5MjJ3bnZkaGg5NnE2dyJ9.U0xQhDaQracUXFn6vxkwUw';
  let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 11,
  center: [longitude, latitude]
  });
}
  
async function getCountryByCode() {
  const code = "by"
  const url = `../countries2.json`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

getCountryByCode();


