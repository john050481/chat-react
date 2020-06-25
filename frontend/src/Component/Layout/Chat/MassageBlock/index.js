import './style.css';
import React, {useEffect, useRef, useState} from 'react';
import Citation from '../Citation';
import {connect} from "react-redux";
import ChatMessage from '../ChatMessage';
import SpinnerApp from "../../../../common/Spinner";
import {setCitation, requestRoomIdMessages} from "../../../../redux/actions";
import {requestToSetReadAllMessages} from "../../../../redux/actions/statusesActions";
import GoEndButton from './GoEndButton';
import {useChat} from "../../../../hooks/useChatFirebase";
import {isElementInViewportContainer} from '../../../../common/inViewport';

let isBlinking = false;

function scrollIsStart(elem) {
    if (!elem)
        return null;

    const {scrollTop} = elem;
    return ( scrollTop === 0 )
}

function scrollIsEnd(elem) {
    if (!elem)
        return null;

    const {scrollTop, scrollHeight, clientHeight} = elem;
    return ( Math.ceil(scrollTop + clientHeight) >= Math.floor(scrollHeight) )
}

function MessageBlock(props) {
    console.log('Render MessageBlock');

    const {citation, messages, statuses, requestRoomId, currentRoomId, setCitation, appIsVisible, appInFocus, requestToSetReadAllMessages, requestRoomIdMessages} = props;

    const chatDb = useChat();

    const [firstUnreadMessageId, setFirstUnreadMessageId] = useState(null);
    useEffect( () => {
        if (currentRoomId !== requestRoomId)
            setFirstUnreadMessageId(null);
    }, [currentRoomId, requestRoomId]);
    useEffect( () => {
        if (!firstUnreadMessageId)
            setFirstUnreadMessageId( statuses.find( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId))?.id );
    }, [statuses, firstUnreadMessageId]);
    useEffect( () => {
        handleScroll();
        if (messages?.length) {
            const lastMessage = messages[messages.length-1];
            const itsMyMessage = chatDb.userId === lastMessage.userId;
            if (itsMyMessage)
                setFirstUnreadMessageId(null);
        }
    }, [messages])
    useEffect( () => {
        if (!appInFocus)
            setFirstUnreadMessageId(null);
    }, [appInFocus]);

    const unreadBlock = useRef(null);
    const messageBlockScroll = useRef(null);
    useEffect( () => {
        if (requestRoomId && currentRoomId) {
            handleScroll();
            if ( firstUnreadMessageId && unreadBlock.current && (!appIsVisible || !appInFocus) ) {
                unreadBlock.current.scrollIntoView(false);
            } else if (firstUnreadMessageId && appInFocus) {
                unreadBlock.current.scrollIntoView();
            } else if (messageBlockScroll.current) {
                messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
            };
        };
    }, [firstUnreadMessageId, appIsVisible, appInFocus, requestRoomId, currentRoomId]);

    const [isScrollStart, setIsScrollStart] = useState(null);
    const [isScrollEnd, setIsScrollEnd] = useState(null);
    useEffect( () => {
        if (isScrollEnd && requestRoomId && currentRoomId) {
            console.log("isScrollEnd = ", isScrollEnd, currentRoomId);
            requestToSetReadAllMessages(currentRoomId, chatDb);
        }
    }, [isScrollEnd, requestRoomId, currentRoomId])
    useEffect( () => {
        if (isScrollStart && requestRoomId && currentRoomId) {
            console.log("isScrollStart = ", isScrollStart);
            requestRoomIdMessages(currentRoomId, chatDb, false);
        }
    }, [isScrollStart, requestRoomId, currentRoomId])
    function handleScroll(e) {
        console.log("handleScroll");
        setIsScrollEnd( scrollIsEnd(messageBlockScroll.current) );
        setIsScrollStart( scrollIsStart(messageBlockScroll.current) );
    }

    function handleClick(e) {
        e.preventDefault();

        let messageElem = e.target.closest('[data-message]');
        if (messageElem) {
            const {id, message, author} = messageElem.dataset;
            setCitation(id, message, author);
            return;
        }

        const citationId = e.target.closest('[data-citationid]')?.dataset?.citationid;
        if (citationId) {
            const citationMessageElem = messageBlockScroll.current?.querySelector(`[data-id=\"${citationId}\"]`)?.closest('.chat-message');
            if(citationMessageElem) {
                if (isBlinking) return;

                if ( !isElementInViewportContainer(citationMessageElem, messageBlockScroll.current)?.elemIsInsideContainer ) {
                    citationMessageElem.scrollIntoView();
                }

                citationMessageElem.classList.add('citation-message-blinking');
                isBlinking = setTimeout( () => {
                    citationMessageElem.classList.remove('citation-message-blinking');
                    isBlinking = false;
                }, 2000)
            }
        }
    }

    return (
        <main className="content message-block-wrapper" onClick={handleClick} >
            <div ref={messageBlockScroll} className='content message-block-scroll' onScroll={handleScroll}>
                <div id='message-block' className='content message-block p-1'>
                    {   !currentRoomId && requestRoomId
                        ? <SpinnerApp />
                        : messages.map( message => {

                                const unreadElement = firstUnreadMessageId === message.id
                                    ? <div ref={unreadBlock} className="message-block-unread">
                                          <hr className="message-block-unread--hr" />
                                      </div>
                                    : null

                                return <ChatMessage
                                    key={message.id}
                                    message={message}
                                    unreadElement={unreadElement}
                                />
                            }
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
            <GoEndButton messageBlockScroll={messageBlockScroll} isScrollEnd={isScrollEnd} />
        </main>
    )
}

const mapStateToProps = store => {
    return {
        citation: store.chat.citation,
        messages: store.chat.messages,
        statuses: store.chat.statuses,
        requestRoomId: store.chat.requestRoomId,
        currentRoomId: store.chat.currentRoomId,
        appIsVisible: store.app.appIsVisible,
        appInFocus: store.app.appInFocus
    }
}
const mapDispatchToProps = {
    setCitation,
    requestToSetReadAllMessages,
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)