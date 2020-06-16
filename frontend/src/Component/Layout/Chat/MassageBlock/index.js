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

    const {citation, messages, statuses, requestRoomId, currentRoomId, setCitation, requestToSetReadAllMessages} = props;

    const chatDb = useChat();

    useEffect( () => {
        handleScroll();
    }, [])

    const unreadBlock = useRef(null);
    const [firstUnreadMessageId, setFirstUnreadMessageId] = useState(null);
    useEffect( () => {
        if (currentRoomId !== requestRoomId)
            return setFirstUnreadMessageId(null);

        if (!firstUnreadMessageId)
            setFirstUnreadMessageId( statuses.find( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId))?.id );
        console.log('statuses.find( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId))?.id = ', firstUnreadMessageId, statuses.find( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId))?.id);
    }, [currentRoomId, requestRoomId, statuses, firstUnreadMessageId]);

    const messageBlockScroll = useRef(null);
    useEffect( () => {
        if (firstUnreadMessageId && unreadBlock.current) {
            unreadBlock.current.scrollIntoView();
        } else if (messageBlockScroll.current) {
            messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
        }

        if (messages?.length) {
            const lastMessage = messages[messages.length-1];
            const itsMyMessage = chatDb.userId === lastMessage.userId;
            if (itsMyMessage)
                setFirstUnreadMessageId(null);
        }
    }, [firstUnreadMessageId, messages]);

    const [isScrollEnd, setIsScrollEnd] = useState(null);
    useEffect( () => {
        if (isScrollEnd)
            requestToSetReadAllMessages(currentRoomId, chatDb);
    }, [isScrollEnd])
    function handleScroll(e) {
        if (!messageBlockScroll.current) return;

        const {scrollTop, scrollHeight, clientHeight} = messageBlockScroll.current;
        if ( Math.ceil(scrollTop + clientHeight) >= Math.floor(scrollHeight) ) {
            setIsScrollEnd(true);
        } else {
            isScrollEnd && setIsScrollEnd(false);
        }
    }

    function handleClick(e) {
        let messageElem = e.target.closest('[data-message]');
        if (messageElem) {
            const {id, message, author} = messageElem.dataset;
            setCitation(id, message, author);
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
                                firstUnreadMessageId={firstUnreadMessageId}
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
        statuses: store.chat.statuses,
        requestRoomId: store.chat.requestRoomId,
        currentRoomId: store.chat.currentRoomId
    }
}
const mapDispatchToProps = {
    setCitation,
    requestToSetReadAllMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)