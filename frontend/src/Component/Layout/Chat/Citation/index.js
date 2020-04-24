import React from 'react'
import './style.css'

export default function Citation(props) {

    return (
        <div className="citation-component">
            <p>{props.text}</p>
            <button className="citation-button close" onClick={props.closeHandler}>x</button>
        </div>
    )
}