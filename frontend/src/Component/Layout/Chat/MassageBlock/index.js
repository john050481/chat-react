import './style.css'
import React from 'react'
import Citation from '../Citation'

export default function MessageBlock(props) {

    function handleClick(e) {
        let target = e.target;
        let message = target.closest('[data-message]')
        if (message) {
            props.setCitation(message.innerText)
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div id='message-block' className='content message-block'>
                {/*тут будут сообщения!!!*/}
            </div>
            {
                props.citation
                    ? <div className='citation-block'>
                        <Citation text={props.citation} closeHandler={()=>props.setCitation('')}/>
                      </div>
                    : null
            }
        </main>
    )
}