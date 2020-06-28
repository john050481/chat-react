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
import usePrevious from "../../../../hooks/usePrevious";
import Spinner from "react-bootstrap/Spinner";

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

function itsMyMessage(messages, messageIndex, myUserId) {
    if (!messages?.length || !myUserId || messageIndex<0)
        return false;

    const lastMessage = messages[messageIndex];
    if (!lastMessage)
        return false;

    return myUserId === lastMessage.userId;
}

function MessageBlock(props) {
    console.log('Render MessageBlock');

    const {citation, messages, statuses, requestRoomId, currentRoomId, setCitation, requestToSetReadAllMessages, requestRoomIdMessages} = props;
    const prevMessagesLength = usePrevious(messages?.length);
    const prevCurrentRoomId = usePrevious(currentRoomId);

    const chatDb = useChat();

    const [firstUnreadMessageId, setFirstUnreadMessageId] = useState(null);
    const prevFirstUnreadMessageId = usePrevious(firstUnreadMessageId);
    useEffect( () => {
        if (currentRoomId !== requestRoomId)
            setFirstUnreadMessageId(false);
    }, [currentRoomId, requestRoomId]);
    useEffect( () => {
        if (!firstUnreadMessageId)
            setFirstUnreadMessageId( statuses.find( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId))?.id );
    }, [statuses, firstUnreadMessageId]);
    useEffect( () => {
        handleScroll();
        if (messages?.length && messages?.length !== prevMessagesLength) {
            if (itsMyMessage(messages, messages.length-1, chatDb.userId)) {
                setFirstUnreadMessageId(false);
            }
        }
    }, [messages, prevMessagesLength])

    const [isScrollStart, setIsScrollStart] = useState(null);
//    const prevIsScrollStart = usePrevious(isScrollStart);
    const [isScrollEnd, setIsScrollEnd] = useState(null);
    const prevIsScrollEnd = usePrevious(isScrollEnd);
    const [scrollHeightBeforeRequestNewMessageHistory, setScrollHeightBeforeRequestNewMessageHistory] = useState(null);
    const [requestRoomIdMessagesFinish, setRequestRoomIdMessagesFinish] = useState(true);
    useEffect( () => {
        if (isScrollStart && requestRoomId && currentRoomId) {
            setRequestRoomIdMessagesFinish(false);
            requestRoomIdMessages( currentRoomId, chatDb, false, () => setRequestRoomIdMessagesFinish(true) );
            setScrollHeightBeforeRequestNewMessageHistory(messageBlockScroll.current?.scrollHeight);
        }
    }, [isScrollStart, requestRoomId, currentRoomId])
    useEffect( () => {
        if (isScrollEnd && requestRoomId && currentRoomId) {
            requestToSetReadAllMessages(currentRoomId, chatDb);
        }
    }, [isScrollEnd, requestRoomId, currentRoomId])

    const unreadBlock = useRef(null);
    const messageBlockScroll = useRef(null);
    useEffect( () => {
        if (requestRoomId && currentRoomId) { // комната выбрана
            handleScroll();
            //console.log("##############", prevFirstUnreadMessageId, firstUnreadMessageId, messageBlockScroll.current?.scrollHeight, scrollHeightBeforeRequestNewMessageHistory, messages?.length, prevMessagesLength);

            if (currentRoomId !== prevCurrentRoomId) { // поменяли комнату
                if (firstUnreadMessageId) {
                    unreadBlock.current.scrollIntoView();
                } else {
                    messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
                }
            } else if (firstUnreadMessageId && prevFirstUnreadMessageId !== firstUnreadMessageId && isScrollEnd) {
                unreadBlock.current.scrollIntoView();
            } else if ( messages?.length !== prevMessagesLength ) { // в текущей комнате, пришло новое сообщение(я)
                if (scrollHeightBeforeRequestNewMessageHistory) {
                    messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight - scrollHeightBeforeRequestNewMessageHistory - 50;
                    setScrollHeightBeforeRequestNewMessageHistory(null);
                } else if ( prevIsScrollEnd || itsMyMessage(messages, messages.length-1, chatDb.userId) ) {
                    messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
                };
            }
        };
    }, [prevFirstUnreadMessageId, prevIsScrollEnd, scrollHeightBeforeRequestNewMessageHistory, firstUnreadMessageId, requestRoomId, currentRoomId, messages, prevMessagesLength, prevCurrentRoomId]);

    function handleScroll(e) {
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
                {
                    (scrollHeightBeforeRequestNewMessageHistory && currentRoomId && requestRoomId && !requestRoomIdMessagesFinish)
                    && <div className="message-block-loader">
                           <Spinner animation="border" variant="success" className="message-block-loader--spinner" />
                       </div>
                }
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
    }
}
const mapDispatchToProps = {
    setCitation,
    requestToSetReadAllMessages,
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBlock)