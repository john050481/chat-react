import './style.css'
import React from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage'

function MessageBlock(props) {

    function handleClick(e) {
        let target = e.target;
        let message = target.closest('[data-message]')
        if (message) {
            props.setCitation(message.innerText)
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div className='content message-block-scroll'>
                <div id='message-block' className='content message-block pl-2 pr-2'>
                    {
                        props.messages.map( message =>
                            <ChatMessage key={message.id} message={message} citation={'bla bla'} owner={'John'}/>
                        )
                    }
                </div>
            </div>
            {
                props.citation
                    ? <div className='message-block-citation'>
                        <Citation text={props.citation} closeHandler={()=>props.setCitation('')}/>
                      </div>
                    : null
            }
        </main>
    )
}

const mapStateToProps = store => {
    return {
        messages: store.chat.messages
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)