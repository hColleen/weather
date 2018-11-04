import React from 'React'

const Form = props => (
    <form onSubmit = {props.getWeather}>
        <button>Get Weather</button>
    </form>
)

export default Form