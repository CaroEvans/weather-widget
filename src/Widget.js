import React, { Fragment, Component } from "react"

class Widget extends Component {

  constructor() {
    super()
    this.state = {
      city: 'brisbane',
      temperature: '-'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  search = (term) => {
    const apiKey = 'topsecret'
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=${apiKey}`).then(response => response.json())
  }

  handleChange(event) {
    this.setState({city: event.target.value});
    const searchTerm = this.state.city
    this.search(searchTerm)
    .then((data) => {
      this.setState({temperature: data['main']['temp']});
      console.log(data)
    })
  }

  render() {
    return (
      <Fragment>
        <div className='container'>
          <div className='content'>
            <label className='form-label' htmlFor="city">Select your city</label>
            {/* <select name="city" id="city"> */}
            <select name="city" id="city" value={this.state.city} onChange={this.handleChange}>
              <option value="brisbane">Brisbane</option>
              <option value="sydney">Sydney</option>
              <option value="melbourne">Melbourne</option>
            </select>
            <p>{`${this.state.city}`}</p>
            <p>{`${this.state.temperature}`}</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default  Widget;

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}