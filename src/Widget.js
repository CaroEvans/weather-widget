import React, { Fragment, Component } from 'react'
import './widget.scss'
import WeatherApi from './WeatherApi';
import IpLookupApi from './IpLookupApi';
import Loader from 'react-loader-spinner';

class Widget extends Component {

  state = {
    location: 'Brisbane,AU',
    temperature: '',
    icon: '',
    description: '',
    loading: false
  }

  searchForWeatherData = (location_string) => {
    this.setState({ loading: true }, () => {
      const weatherService = new WeatherApi(process.env.REACT_APP_OPEN_MAPS_API_KEY)
      weatherService.findWeatherData(location_string)
      .then((data) => {
        this.setState({ temperature: data.main.temp })
        this.setState({ description: data.weather[0].description })
        return weatherService.findIconBlob(data.weather[0].icon)
      })
      .then(image_blob => {
        this.setState({ icon: URL.createObjectURL(image_blob) })
      })
      .then(() => this.setState({ loading: false }))
      .catch(err => console.log('There was an error searching for weather' + err))
    })
  }

  findLocationOrUseDefault = () => {
    const { location } = this.state;
    this.setState({ loading: true }, () => {
      IpLookupApi.findLocationData()
      .then(response => {
        this.setState({ location:`${response.city},${response.countryCode}`})
      })
      .then(this.searchForWeatherData(location))
    })
  }

  componentDidMount = () => {
    this.findLocationOrUseDefault()
  }

  handleChange = (event) => {
    const { location } = this.state;
    this.setState(
      { location: event.target.value },
      () => this.searchForWeatherData(location)
    )
  }

  render() {
    const { loading, icon, location, temperature, description } = this.state;
    console.log(icon)
    return (
      <Fragment>
        <div className='container'>
          <div className='content'>
            { loading ? <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /> :
              <Fragment>
                <label className='form-label' htmlFor='location'>Select your city:</label>
                <select name='location' id='location' value={location} onChange={this.handleChange}>
                  <option value='Brisbane, AU'>Brisbane</option>
                  <option value='Sydney, AU'>Sydney</option>
                  <option value='Melbourne, AU'>Melbourne</option>
                </select>
                <p className='temperature'>
                  <span> The current temperature in </span>
                  <span className='city-title'>
                    {`${location.split(',').shift()}`}:
                  </span>
                  { icon && description && temperature &&
                    <span className='weather-icon'>
                      <img src={icon} alt={`${description}`} />
                      {`${Math.trunc(temperature)}`}°C
                    </span>
                  }
                </p>
              </Fragment>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Widget