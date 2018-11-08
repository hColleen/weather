import React, { Component } from 'react'

let forecastApi = "https://api.openweathermap.org/data/2.5/forecast?"
const API_KEY = "a1a849c982e707bbf6fa3890ce6a7add"

export default class FiveDay extends Component{

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          forecastApi += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          this.getForecast(forecastApi)
        }
      )
    }
  }

  getForecast = async () => {
    const api_call = await fetch(`${forecastApi}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json()
    console.log(data)
  }
  
  render() {
    return (
     <div>
      Five Day Forecast
     </div> 
    )
  }
}