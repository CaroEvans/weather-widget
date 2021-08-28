import React, { Fragment, Component } from 'react'
import './widget.scss'

class Widget extends Component {

  state = {
    city: 'Brisbane',
    temperature: '-',
    icon: '',
    description: ''
  }

  searchForWeatherData = (term) => {
    const openMapsApiKey = process.env.REACT_APP_OPEN_MAPS_API_KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&appid=${openMapsApiKey}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({ temperature: data.main.temp })
      this.setState({ icon: data.weather[0].icon })
      this.setState({ description: data.weather[0].description })
    })
    .catch(err => console.log('There was an error searching for weather' + err))
  }

  findLocationOrUseDefault = () => {
    fetch('https://extreme-ip-lookup.com/json/')
    .then( response => response.json())
    .then(response => this.setState({ city: response.city }))
    .then(this.searchForWeatherData(this.state.city))
  }

  componentDidMount = () => {
    this.findLocationOrUseDefault()
  }

  handleChange = (event) => {
    this.setState(
      { city: event.target.value },
      () => this.searchForWeatherData(this.state.city)
    )
  }


  render() {
    return (
      <Fragment>
        <div className='container'>
          <div className='content'>
            <label className='form-label' htmlFor='city'>Select your city:</label>
            <select name='city' id='city' value={this.state.city} onChange={this.handleChange}>
              <option value='Brisbane'>Brisbane</option>
              <option value='Sydney'>Sydney</option>
              <option value='Melbourne'>Melbourne</option>
            </select>
            <p className='temperature'>
              <span> The current temperature in </span>
              <span className='city-title'>{`${this.state.city}`}:</span>
              { this.state.icon &&
                <span className='weather-icon'>
                  <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt={`${this.state.description}`} />
                  {`${Math.trunc(this.state.temperature)}`}°C
                </span>
              }
            </p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Widget