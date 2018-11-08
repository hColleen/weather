import React, { Component } from 'react'
import './App.css'
import Title from './components/Title'
import Weather from './components/Weather'
import FiveDay from './components/Forecast';


const API_KEY = "a1a849c982e707bbf6fa3890ce6a7add"
let api = "https://api.openweathermap.org/data/2.5/weather?"

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          api += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          this.getWeather(api)
        }
      )
    }
  }

  getWeather = async () => {
    const api_call = await fetch(`${api}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json()
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].id,
      error: ''
    })
  }


  render() {
    return (
      <div className="App">
        <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-5 title-container">
                <Title />
              </div>
              <div className="col-7 form-container">
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  icon={this.state.icon}
                  error={this.state.error}
                />
                <FiveDay />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;


/* Tutorials from here:
https://stackoverflow.com/questions/51952341/how-do-i-get-users-location-via-navigator-geolocation-before-my-fetch-executes
https://www.youtube.com/watch?v=204C9yNeOYI
https://stackoverflow.com/questions/32230635/passing-in-class-names-to-react-components
*/