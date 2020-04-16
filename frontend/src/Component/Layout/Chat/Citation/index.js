import React from 'react'
import './style.css'

export default function Citation(props) {

    return (
        <div className="citationRootBlock" style={{...props.style}}>
            {props.text}
            <button className="close" onClick={props.closeHandler}>x</button>
        </div>
    )
}