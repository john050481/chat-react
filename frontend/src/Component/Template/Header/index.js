import React from 'react'
import './style.css'

export default function (props) {
    return (
        props.children
        ? <header className="header" {...props}>
              {props.children}
          </header>
        : null
   )
}