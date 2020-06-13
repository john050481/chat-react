import './style.css'
import React, {useEffect, useRef, useState} from 'react'
import Citation from '../Citation'
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage'
import SpinnerApp from "../../../../common/Spinner";
import {setCitation} from "../../../../redux/actions";
import {requestToSetReadAllMessages} from "../../../../redux/actions/statusesActions";
import StatusedAndGoEnd from './StatusedAndGoEnd'
import {useChat} from "../../../../hooks/useChatFirebase";

function MessageBlock(props) {
    console.log('Render MessageBlock');

    const {citation, messages, requestRoomId, currentRoomId, setCitation, requestToSetReadAllMessages} = props;

    const chatDb = useChat();

    let unreadBlock = useRef(null);
    const [firstUnreadMessage, setFirstUnreadMessage] = useState(null);
    useEffect( () => {
        unreadBlock.current = null;
        setFirstUnreadMessage(null);
    }, [currentRoomId]);

    let messageBlockScroll = useRef(null);
    /* !!!!!!!!! позиционировать скролл на unreadBlock !!!!!!!!! */
    useEffect( () => {
        console.log('###messageBlockScroll### === ', messageBlockScroll);
        if (!messageBlockScroll.current) return;
        messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
    }, []);

    useEffect( () => {
        handleScroll();
    }, [messages])

    function handleClick(e) {
        let target = e.target;
        let messageElem = target.closest('[data-message]')
        if (messageElem) {
            const {id, message, author} = messageElem.dataset;
            setCitation(id, message, author);
        }
    }

    const [isScrollEnd, setIsScrollEnd] = useState(null);
    useEffect( () => {
        if (isScrollEnd) {
            requestToSetReadAllMessages(
                currentRoomId,
                chatDb,
                ()=>{
                    unreadBlock.current = null;
                    setFirstUnreadMessage(null);
                }
            );
        }
    }, [isScrollEnd])
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
                    {   !currentRoomId && requestRoomId
                        ? <SpinnerApp />
                        : messages.map( message =>
                            <ChatMessage
                                key={message.id}
                                message={message}
                                unreadBlock={unreadBlock}
                                firstUnreadMessage={firstUnreadMessage}
                                setFirstUnreadMessage={setFirstUnreadMessage}
                            />
                          )
                    }
                </div>
            </div>
            {
                citation.text &&
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
        requestRoomId: store.chat.requestRoomId,
        currentRoomId: store.chat.currentRoomId
    }
}
const mapDispatchToProps = {
    setCitation,
    requestToSetReadAllMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)