import './style.css'
import React from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";

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
            <div id='message-block' className='content message-block'>
                {/*тут будут сообщения!!!*/}
                {
                    props.messages.map( message =>
                        <div key={message.id} className='message-wrap left-message left-color' data-message={true}>
                            {message.body}
                        </div>
                    )
                }
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

const mapStateToProps = store => {
    return {
        messages: store.chat.messages
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)