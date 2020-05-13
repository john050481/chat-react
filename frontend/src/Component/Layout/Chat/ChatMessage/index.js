import './style.css';
import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast'
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";

function ChatMessage(props) {
    const {user, currentRoom, message} = props;

    const [citationComp, setCitationComp] = useState(null);

    const chatDb = useChat();

    useEffect( () => {
        if (message.citationId)
            (async () => {
                const citationOnDb = await chatDb.getRoomMessage(currentRoom.id, message.citationId);
                setCitationComp(citationOnDb);
            })()
    }, [])

    return (
        <Toast className={'chat-message' + (message.userId !== user.id ? ' notMy' : ' my')}>
            {
                message.name &&
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{message.name}</strong>
                    <small className='ml-3'>
                        {new Date(message.timestamp.seconds*1000).toLocaleDateString()} {' / '}
                        {new Date(message.timestamp.seconds*1000).toLocaleTimeString()}
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
            <small className='chat-message--time'>{'{11 mins ago}'}</small>
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