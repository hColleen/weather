import React, { Component } from 'react'
import './App.css'
import Title from './components/Title'
import Weather from './components/Weather'

const API_KEY = "a1a849c982e707bbf6fa3890ce6a7add"

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    long = position.coords.longitude;
    lat = position.coords.latitude;
  })
}

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

  getWeather = async (e) => {
    e.preventDefault()
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
    const data = await api_call.json()
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

  render() {
    return (
      <div className="App">
        <Title />
        <Weather />
      </div>
    );
  }
}

export default App;
