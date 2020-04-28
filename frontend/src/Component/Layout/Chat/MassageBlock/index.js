import './style.css'
import React, {useEffect, useRef} from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage'
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

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
            props.setCitation(message.innerText)
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div ref={messageBlockScroll} className='content message-block-scroll'>
                <div id='message-block' className='content message-block p-1'>
                    {   (!props.messages.length && props.requestChatId)
                        ? <Container className='App-spinner-container message-block-spinner'>
                              <Spinner className='App-spinner' animation="grow" variant="info" />
                          </Container>
                        : props.messages.map( message =>
                            <ChatMessage
                                key={message.id}
                                message={message}
                                citation={message.id % 3 ? '{bla bla bla citation}' : ''}
                                owner={message.id % 2 ? '{Any user}' : ''}/>
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
        messages: store.chat.messages,
        requestChatId: store.chat.requestChatId
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)