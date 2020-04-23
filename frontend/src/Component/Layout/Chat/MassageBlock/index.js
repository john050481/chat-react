import './style.css'
import React from 'react'
import Main from "../../../Template/Main";

export default function MessageBlock(props) {

    function handleClick(e) {
        let target = e.target;
        let message = target.closest('[data-message]')
        if (message) {
            props.setCitation(message.innerText)
        }
    }

    return (
        <main
            className="content main-content message-block"
            onClick={handleClick}
        />
    )
}