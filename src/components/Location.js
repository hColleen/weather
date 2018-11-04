import React from 'react'

const Location = props => (
    <form onSubmit={props.findCoordinates}>
        <button>Get Location</button>
    </form>
)

export default Location