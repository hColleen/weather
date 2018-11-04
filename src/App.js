import React, { Component } from 'react'
import './App.css'
import Title from './components/Title'
import Weather from './components/Weather'

class App extends Component {
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
