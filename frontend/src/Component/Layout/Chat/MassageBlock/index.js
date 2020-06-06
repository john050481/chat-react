import './style.css'
import React, {useEffect, useRef, useState} from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage'
import SpinnerApp from "../../../../common/Spinner";
import {setCitation} from "../../../../redux/actions";
import StatusedAndGoEnd from './StatusedAndGoEnd'

function MessageBlock(props) {
    console.log('Render MessageBlock');

    let messageBlockScroll = useRef(null);
    useEffect( () => {
        console.log('###messageBlockScroll### === ', messageBlockScroll);
        if (!messageBlockScroll.current) return;
        messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
    }, []);

    useEffect( () => {
        handleScroll();
    }, [props.messages])

    function handleClick(e) {
        let target = e.target;
        let messageElem = target.closest('[data-message]')
        if (messageElem) {
            const {id, message, author} = messageElem.dataset;
            props.setCitation(id, message, author);
        }
    }

    const [isScrollEnd, setIsScrollEnd] = useState(null);
    function handleScroll(e) {
        if (!messageBlockScroll.current) return;

        const {scrollTop, scrollHeight, clientHeight} = messageBlockScroll.current;
        if (scrollTop + clientHeight >= scrollHeight) {
            setIsScrollEnd(true);
        } else {
            isScrollEnd && setIsScrollEnd(false);
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div ref={messageBlockScroll} className='content message-block-scroll' onScroll={handleScroll}>
                <div id='message-block' className='content message-block p-1'>
                    {   (!props.messages.length && props.requestRoomId)
                        ? <SpinnerApp />
                        : props.messages.map( message =>
                            <ChatMessage
                                key={message.id}
                                message={message}
                                messageBlockScroll={messageBlockScroll}
                            />
                          )
                    }
                </div>
            </div>
            {
                props.citation.text &&
                <div className='message-block-citation'>
                    <Citation />
                </div>
            }
            <StatusedAndGoEnd messageBlockScroll={messageBlockScroll} isScrollEnd={isScrollEnd} />
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