import React, { Component } from 'react'
import './App.css'
import Title from './components/Title'
import Weather from './components/Weather'
import Location from './components/Location'
import Form from './components/Form'

const API_KEY = "a1a849c982e707bbf6fa3890ce6a7add"

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined,
    lat: '',
    long: ''
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      }
    )
  }

  getWeather = async (e) => {
    e.preventDefault()
    if (lat && long){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
      const data = await api_call.json()
      console.log(data)
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weater[0].description,
        icon: data.weather[0].icon,
        error: ''
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Title />
        <Location findCoordinates = {this.findCoordinates} />
        <Form getWeather = {this.getWeather} />
        <Weather 
        temperature = {this.state.temperature}
        city = {this.state.city}
        country = {this.state.country}
        humidity = {this.state.humidity}
        description = {this.props.description}
        icon = {this.props.icon}
        error = {this.props.error}
        />
      </div>
    );
  }
}

export default App;
