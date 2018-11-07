import React, { Component } from 'react'

export default class Title extends Component{
    render(){
        return(
        <div>
            <h1 className="title-container__title">L<i className ="wi wi-day-sunny"></i>ca<i className = "wi wi-thermometer"></i> Weather</h1>
        </div>
        )
    }
}