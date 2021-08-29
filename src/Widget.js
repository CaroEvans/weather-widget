import React, { Fragment, Component } from 'react'
import './widget.scss'

class Widget extends Component {

  state = {
    location: 'Brisbane,AU',
    temperature: '-',
    icon: '',
    description: ''
  }

  searchForWeatherData = (location_string) => {
    const openMapsApiKey = process.env.REACT_APP_OPEN_MAPS_API_KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location_string}&units=metric&appid=${openMapsApiKey}`)
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
    .then(response => {
      this.setState({ location: `${response.city},${response.countryCode}`})
    })
    .then(this.searchForWeatherData(this.state.location))
  }

  componentDidMount = () => {
    this.findLocationOrUseDefault()
  }

  handleChange = (event) => {
    this.setState(
      { location: event.target.value },
      () => this.searchForWeatherData(this.state.location)
    )
  }


  render() {
    return (
      <Fragment>
        <div className='container'>
          <div className='content'>
            <label className='form-label' htmlFor='location'>Select your city:</label>
            <select name='location' id='location' value={this.state.location} onChange={this.handleChange}>
              <option value='Brisbane, AU'>Brisbane</option>
              <option value='Sydney, AU'>Sydney</option>
              <option value='Melbourne, AU'>Melbourne</option>
            </select>
            <p className='temperature'>
              <span> The current temperature in </span>
              <span className='city-title'>{`${this.state.location.split(',').shift()}`}:</span>
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