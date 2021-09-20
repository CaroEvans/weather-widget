class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  // TO DO: test these methods

  findWeatherData = async (location_string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location_string}&units=metric&appid=${this.apiKey}`)
    return await response.json()
  }
}

export default WeatherApi