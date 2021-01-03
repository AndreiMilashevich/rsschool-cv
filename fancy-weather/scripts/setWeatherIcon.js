export function setWeatherIcon(weather, item) {
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