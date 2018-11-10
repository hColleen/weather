import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';

let forecastApi = "https://api.openweathermap.org/data/2.5/forecast?"
const API_KEY = "a1a849c982e707bbf6fa3890ce6a7add"

export default class FiveDay extends Component{

  constructor (props) {
    super(props)
    this.state = {
      graphData: {}
    }
  }
  static defaultProps = {
    displayTitle: false,
    displayLegend: false,
    displayLabel: false
  }
  
  
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
    let temp = [], icon = [], timestamp =[], dateArray = []
    for (let i = 0; i < data.list.length; i++){
      temp.push(data.list[i].main.temp)
      icon.push(data.list[i].weather[0].id)
      timestamp.push(data.list[i].dt)
    }
    for (let i = 0; i < timestamp.length; i ++){
      let date = new Date(timestamp[i] * 1000)
      let options = { weekday: 'short', month: 'short'}
      dateArray.push(date.toLocaleString(options))
    }
    console.log(dateArray)
    this.setState({
      graphData:{
    labels: dateArray,
    datasets:[
      {
      label: '',
      data: temp,
      backgroundColor:['#001233']
      }
    ]
  }
  })
  }
  
  render() {
    return (
     <div className = "forecast_graph">
      <h3 className = "forecast_title">Five Day Forecast</h3>
      <Line 
        data = {this.state.graphData}
        options = {{
          title: {
            display: this.props.displayTitle
          },
          legend:{
            display: this.props.displayLegend
          }
        }}
      />
     </div> 
    )
  }
}