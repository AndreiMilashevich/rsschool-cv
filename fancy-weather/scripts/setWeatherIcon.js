export function setWeatherIcon(weather, item) {
  let backgroundImage;
    switch(weather) {
      case('Snow'):
      backgroundImage = "url('../icons/snow.svg')";
      break;
      case('Thunderstorm'):
      backgroundImage = "url('../icons/thunder.svg')";
      break;
      case('Drizzle'):
      backgroundImage = "url('../icons/drizzle.svg')";
      break;
      case('Fog'):
      backgroundImage = "url('../icons/mist.svg')";
      break;
      case('Haze'):
      backgroundImage = "url('../icons/mist.svg')";
      break;
      case('Clean'):
      backgroundImage = "url('../icons/clear-day.svg')";
      break;
      case('Clouds'):
      backgroundImage = "url('../icons/cloudy.svg')";
      break;
      case('Rain'):
      backgroundImage = "url('../icons/rain.svg')";
      break;
      default:
      backgroundImage = "url('../icons/partly-cloudy-day.svg')";
    }
    item.style.backgroundImage = backgroundImage;
  }