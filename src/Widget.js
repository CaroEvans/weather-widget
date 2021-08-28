import React, { Fragment, Component } from 'react'
import './widget.scss';

class Widget extends Component {

  constructor() {
    super()
    this.state = {
      city: 'Brisbane',
      temperature: '-',
      icon: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  searchForWeatherData = (term) => {
    const apiKey = process.env.REACT_APP_MAP_API_KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&appid=${apiKey}`).then(response => response.json())
    .then((data) => {
      this.setState({ temperature: data.main.temp });
      this.setState({ icon: data.weather[0].icon });
      this.setState({ description: data.weather[0].description });
    })
    .catch(err => console.log('There was an error searching for weather' + err))
  }

  componentDidMount = () => { this.searchForWeatherData(this.state.city) }

  handleChange = (event) => {
    this.setState(
      { city: event.target.value },
      () => this.searchForWeatherData(this.state.city)
    );
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
              { this.state.icon &&
                <span>
                  <img className='weather-icon' src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt={`${this.state.description}`} />
                  {`${this.state.temperature}`}°C
                </span>
              }
            </p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Widget;