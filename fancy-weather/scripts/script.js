import '../scss/index.scss'

//variables
let city = ''
let countryCode = 'by';
let latitude;
let longitude;
let countryName = ''
let lang = 'ru';
let tempFlag = 'c';
let weatherData = 1;
let dataCodeRu = {};
let tempNow = 270;
let weatherDescription = 'rain';
let feels = 8;
let wind = 5;
let humidity = 50;

const forecastImage = document.querySelectorAll('.forecast_image');
const dayOfWeek = document.querySelectorAll('.day_of_week');
const otherDaysTemp = document.querySelectorAll('.temp_forecast');
const searchSity = document.querySelector('.input_field');
const refreshButton = document.querySelector('.button_refresh');
const arrows = document.querySelector('.button_refresh_arrows');
const time = document.querySelector('.time');
const langButton = document.querySelector('.button_lang');
const searchButton = document.querySelector('.submit');
const inputField = document.querySelector('.input_field');
const cityDOM = document.querySelector('.city');
const tempNowDOM = document.querySelector('.temp_now');
const feelsDOM = document.querySelector('.feels');
const windDOM = document.querySelector('.wind');
const humidityDOM = document.querySelector('.humidity');
const weatherDescriptionDOM = document.querySelector('.weather_description');
const weatherNowIcon = document.querySelector('.weather_image_main');
const weatherItem = document.querySelector('.weather_item');
const lonDOM = document.querySelector('.lon');
const latDOM = document.querySelector('.lat');
const map = document.querySelector('.map');


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
const dayOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
const dayOfWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayOfWeekShortEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayOfWeekShortRu = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const monthTitleEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthTitleRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;

const mapOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};



//function declarations

async function setBackground() {
  try {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=cZQGeB1ysDcDPOXSoOgZDe9uwqVNQ_cs0kCq7UmzMzA';
    const res = await fetch(url);
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  } catch(e) {
    const num = Math.floor(Math.random() * imageLinksLibrary.length);
    document.body.style.backgroundImage = `url(${imageLinksLibrary[num]})`;
  } 
}



async function getCoordsFromNavigator(position) {
  const crd = await position.coords;
  latitude = parseFloat(crd.latitude).toPrecision(4);
  longitude = parseFloat(crd.longitude).toPrecision(4);
  console.log(latitude, longitude)
  getMap();   // attention
  await getWeatherByCoord();
  getForecast();  // attention
}

async function getCoordsFromNavigatorError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  await getPlaceByIp();
  getWeatherByCity();
  getForecast();
}

async function getPlaceByIp() {
  try {
    const url = 'https://ipinfo.io/json?token=cb5f57499775d8'
    const resp = await fetch(url);
    const data = await resp.json();
    city = data.city;
    countryCode = data.country;
    const loc = data.loc.split(',');
    latitude = loc[0];
    longitude = loc[1];
    getMap();
    getWeatherByCity();
    getForecast();
} catch {
    console.log('Error, do not get your IP');
    getMap();
  }
}

function timeInsert() {
  const timeNow = new Date();
  const month = timeNow.getMonth();
  const day = timeNow.getDay();
  //const day = 0;
  const date = timeNow.getDate();
  const hour = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  if (lang === 'en') {
    time.textContent = `${dayOfWeekShortEn[day]} ${date} ${monthTitleEn[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    dayOfWeek.forEach((item, i) => {item.textContent = dayOfWeekEn[(i + 1 + day) % 7]})
  } else {
    time.textContent = `${dayOfWeekShortRu[day]} ${date} ${monthTitleRu[month]} ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    dayOfWeek.forEach((item, i) => {item.textContent = dayOfWeekRu[(i + 1 + day) % 7] })
  }
  
  setTimeout(timeInsert, 1000);
}

function getLang() {
  if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
    lang = en;
  } else {
    lang = localStorage.getItem('lang');
  }
}

function setContentRu() {
  langButton.textContent = 'RU';
  inputField.placeholder = 'Найти город'
  lang = 'ru';
  localStorage.setItem('lang','ru');
  lonDOM.textContent = `долгота: ${Math.floor(longitude)}° ${Math.round((longitude % 1) * 60)}'`;
  latDOM.textContent = `широта: ${Math.floor(latitude)}° ${Math.round((latitude % 1) * 60)}'`;
  getCountryByCode();
  cityDOM.textContent = `${city}, ${countryName}`;
  feelsDOM.textContent = `Ощущается: ${convertTemp(feels)}°`;
  windDOM.textContent = `Ветер: ${wind} м/с`;
  humidityDOM.textContent = `Влажность: ${humidity} %`;
}

async function setContentEn() {
  langButton.textContent = 'EN';
    inputField.placeholder = 'Enter city'
    lang = 'en';
    localStorage.setItem('lang','en');
    lonDOM.textContent = `longitude: ${Math.floor(longitude)}° ${Math.round((longitude % 1) * 60)}'`;
    latDOM.textContent = `latitude: ${Math.floor(latitude)}° ${Math.round((latitude % 1) * 60)}'`;
    await getCountryByCode();
    cityDOM.textContent = `${city}, ${countryName}`;
    feelsDOM.textContent = `Feels: ${convertTemp(feels)}°`;
    windDOM.textContent = `Wind: ${wind} m/s`;
    humidityDOM.textContent = `Humidity: ${humidity} %`;
}

function setPageContent() {
  if (lang === 'en') {
    setContentEn();
    
  } else {
    setContentRu(); 
  }
  tempNowDOM.textContent = `${convertTemp(tempNow)}°`;
  weatherDescriptionDOM.textContent = weatherDescription;
}

function switchPageContent() {
  if (lang === 'en') {
    setContentRu();
  } else {
    setContentEn();
  }
}

function convertTemp(temp) {
  if (tempFlag === 'c') {
    return Math.round(temp - 273.15)
  } else {
    return Math.round((temp * 9 / 5) - 459.67) // converting Kelvins to Fahrenheit
  }
}

function getMap() {
  const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9objQ4NDIiLCJhIjoiY2tqNGUwd3dyMGp5MjJ3bnZkaGg5NnE2dyJ9.U0xQhDaQracUXFn6vxkwUw';
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 11,
  center: [longitude, latitude]
  });
}

async function getCountryCodeDataRu() {
  const url = `../countries.json`;
  const responce = await fetch(url);
  const data = await responce.json();
  dataCodeRu = data;
  console.log(dataCodeRu);
}

  
async function getCountryByCode() {
  if (lang === 'ru') {
    for (let i = 0; i < dataCodeRu.length; i++) {
      if (dataCodeRu[i].ALFA2 === countryCode) {
        countryName = dataCodeRu[i].SHORTNAME; 
        countryName = countryName.split(' ');
        for (let i = 0; i < countryName.length; i++){
          countryName[i] = countryName[i].split('');
          for (let j = 1; j < countryName[i].length; j++) {
            countryName[i][j] = countryName[i][j].toLowerCase();
          }
          countryName[i] = countryName[i].join('');
        }
        countryName = countryName.join(' ');
        return;
     }
    }
  } else if (lang === 'en') {
      const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
      const res = await fetch(url);
      const data = await res.json();
      countryName = data.name;   
      console.log(data.name);
      return countryName;
    }
}

async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&cnt=25&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data); 
  otherDaysTemp.forEach((item, i) => {
    item.textContent = `${convertTemp(data.list[(i + 1) * 8].main.temp)}°`;
  });
  forecastImage.forEach((item, i) => {
    setWeatherIcon(data.list[(i + 1) * 8].weather[0].main, item)
  }); 
}


async function getWeatherByCoord() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  weatherDescription = data.weather[0].description;
  humidity = data.main.humidity;
  feels = data.main.feels_like;
  wind = data.wind.speed;
  console.log(weatherDescription);
  countryCode = data.sys.country;
  city = data.name;
  tempNow = data.main.temp;
  setPageContent();
  setWeatherIcon(data.weather[0].main, weatherNowIcon);
  console.log(data);
  console.log(city);
}


async function getWeatherByCity() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
  const res = await fetch(url);
  const data = await res.json();
  weatherDescription = data.weather[0].description;
  humidity = data.main.humidity;
  feels = data.main.feels_like;
  wind = data.wind.speed;
  city = data.name;
  console.log(weatherDescription);
  countryCode = data.sys.country;
  latitude = data.coord.lat;
  longitude = data.coord.lon;
  console.log(data);
  countryCode = data.sys.country;
  await getCountryByCode(countryCode);
  setPageContent();
  //setWeather(data, countryName);
  //getMap();
}

//functions call

refreshButton.addEventListener('click', () => {
  setBackground();
  arrows.classList.toggle('rotate');
});

navigator.geolocation.getCurrentPosition(getCoordsFromNavigator, getCoordsFromNavigatorError, mapOptions);
setBackground();
timeInsert();
getLang();
setPageContent();
getCountryCodeDataRu();
getCountryByCode();
console.log(countryCode);
langButton.addEventListener('click', () => {
  switchPageContent();
  getWeatherByCity();
});





























// searchButton.addEventListener('click', () => {
//     searchCity();  
// });



















// async function getWeatherByCity() {
//   let searchSity = document.querySelector('.input_field');
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=96e6b196f9fa76950df28c29b8eaa59c`;
//   const res = await fetch(url);
//   const data = await res.json();
//   latitude = data.coord.lat;
//   longitude = data.coord.lon;
//   console.log(data);
//   countryCode = data.sys.country;
//   await getCountryByCode(countryCode);
//   setWeather(data, countryName);
//   getMap();
// }



function setWeatherIcon(weather, item) {
  switch(weather) {
    case('Snow'):
    item.style.backgroundImage = "url('../icons/snow.svg')";
    break;
    case('Thunderstorm'):
    item.style.backgroundImage = "url('../icons/thunderstorms.svg')";
    break;
    case('Drizzle'):
    item.style.backgroundImage = "url('../icons/drizzle.svg')";
    break;
    case('Fog'):
    item.style.backgroundImage = "url('../icons/mist.svg')";
    break;
    case('Haze'):
    item.style.backgroundImage = "url('../icons/mist.svg')";
    break;
    case('Clean'):
    item.style.backgroundImage = "url('../icons/clear-day.svg')";
    break;
    case('Clouds'):
    item.style.backgroundImage = "url('../icons/cloudy.svg')";
    break;
    case('Rain'):
    item.style.backgroundImage = "url('../icons/rain.svg')";
    break;
    default:
    item.style.backgroundImage = "url('../icons/partly-cloudy-day.svg')";
  }
}

























