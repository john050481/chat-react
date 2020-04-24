import React from 'react'
import './style.css'

export default function Citation(props) {

    return (
        <div className="citation-component" style={{...props.style}}>
            {props.text}
            <button className="citation-button close" onClick={props.closeHandler}>x</button>
        </div>
    )
}