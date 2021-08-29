class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  findWeatherData = (location_string) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location_string}&units=metric&appid=${this.apiKey}`)
    .then(response => response.json())
  }

  findIconBlob = (icon_code) => {
    return fetch(`http://openweathermap.org/img/w/${icon_code}.png`)
    .then(response => response.blob())
  }
}

export default WeatherApi