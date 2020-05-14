import './style.css';
import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast'
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";

function ChatMessage(props) {
    const {user, currentRoom, message, messageBlockScroll} = props;

    const [citationComp, setCitationComp] = useState(null);

    const chatDb = useChat();

    useEffect( () => {
        if (message.citationId)
            (async () => {
                const citationOnDb = await chatDb.getRoomMessage(currentRoom.id, message.citationId);
                setCitationComp(citationOnDb);
                if (!messageBlockScroll.current) return;
                messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
            })()
    }, [])

    function diffDay(date1ms, date2ms) {
        return Math.floor( (date1ms - date2ms)/1000/60/60/24 );
    }
    function formatDate(dateMs) {
        const date = new Date(dateMs);

        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();

        return  `${dateStr} | ${timeStr}`
    }

    const itsMe = user.id === message.userId;
    const day = diffDay(Date.now(), message.timestamp.seconds*1000);

    return (
        <Toast className={'chat-message' + (itsMe ? ' my' : ' notMy')}>
            {
                message.name &&
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">
                        {itsMe ? "Вы" : message.name }
                    </strong>
                    <small className='ml-3'>
                        {formatDate(message.timestamp.seconds*1000)}
                    </small>
                </Toast.Header>
            }
            <Toast.Body>
                {
                    citationComp &&
                    <div className='chat-message--citation m-1 p-2'>
                        <small><i>{citationComp.message}</i></small>
                    </div>
                }
                <p data-message={message.message} data-author={message.name} data-id={message.id}>{message.message}</p>
            </Toast.Body>
            <small className='chat-message--time'>{day ? `${day} day ago` : 'today'}</small>
        </Toast>
    )
}

const mapStateToProps = store => {
    return {
        user: store.chat.user,
        currentRoom: store.chat.currentRoom
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)