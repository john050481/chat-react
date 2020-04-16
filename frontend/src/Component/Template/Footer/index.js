import React from 'react'
import './style.css'

export default function (props) {
    return (
        props.children
        ? <footer className="footer" {...props}>
              {props.children}
          </footer>
        : null
    )
}