import './style.css'
import React, {useEffect, useRef} from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage'
import SpinnerApp from "../../../Spinner";
import {setCitation} from "../../../../redux/actions";

function MessageBlock(props) {
    console.log('Render MessageBlock');

    let messageBlockScroll = useRef(null);
    useEffect( () => {
        console.log('###messageBlockScroll### === ', messageBlockScroll);
        if (!messageBlockScroll.current) return;
        messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
    })

    function handleClick(e) {
        let target = e.target;
        let message = target.closest('[data-message]')
        if (message) {
            let chatMessageElem = target.closest('.chat-message');
            let authorElem = chatMessageElem && chatMessageElem.querySelector('[data-author]');
            let author = authorElem ? authorElem.dataset.author : '';
            props.setCitation(message.innerText, author);
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div ref={messageBlockScroll} className='content message-block-scroll'>
                <div id='message-block' className='content message-block p-1'>
                    {   (!props.messages.length && props.requestRoomId)
                        ? <SpinnerApp />
                        : props.messages.map( message =>
                            <ChatMessage
                                key={message.id}
                                message={message}
                            />
                          )
                    }
                </div>
            </div>
            {
                props.citation.text
                    ? <div className='message-block-citation'>
                        <Citation />
                      </div>
                    : null
            }
        </main>
    )
}

const mapStateToProps = store => {
    return {
        citation: store.chat.citation,
        messages: store.chat.messages,
        requestRoomId: store.chat.requestRoomId
    }
}
const mapDispatchToProps = {
    setCitation
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)