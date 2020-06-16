import './style.css';
import React, {useEffect, useState, useRef} from 'react';
import Toast from 'react-bootstrap/Toast'
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";
import useOnScreenUnReadMessage from "../../../../hooks/useOnScreenUnReadMessage";
import {printFormatDate, diffDateInDays, printFormatDaysAgo} from '../../../../common/dates';
import {FaCircle} from "react-icons/fa";

function ChatMessage(props) {
    console.log('Render ChatMessage');

    const {currentRoomId, message, unreadElement} = props;

    const chatDb = useChat();

    const [citationComp, setCitationComp] = useState(null);
    useEffect( () => {
        if (message.citationId)
            (async () => {
                const citationOnDb = await chatDb.getRoomMessage(currentRoomId, message.citationId);
                setCitationComp(citationOnDb);
            })()
    }, [])

    const chatMessageRef = useRef();
    const isRead = useOnScreenUnReadMessage(chatMessageRef, chatDb, message);

    let milliseconds = message.timestamp ? message.timestamp.seconds*1000 : NaN;
    const itsMyMessage = chatDb.userId === message.userId;
    const daysAgo = diffDateInDays(Date.now(), milliseconds);

    return (
        <>
            {unreadElement}

            <Toast ref={chatMessageRef} className={'chat-message' + (itsMyMessage ? ' my' : ' notMy')}>
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto">
                        {itsMyMessage ? "Вы" : message.name }
                    </strong>
                    <small className='ml-3'>
                        {printFormatDate(milliseconds)}
                    </small>
                    <FaCircle
                        style={{color: isRead ? 'green' : 'orange', marginLeft: '5px'}}
                        title={isRead ? 'Прочитано' : 'Не прочитано'}
                    />
                </Toast.Header>
                <Toast.Body>
                    {
                        citationComp &&
                        <div className='chat-message--citation m-1 p-2'>
                            <small><i>{citationComp.message}</i></small>
                        </div>
                    }
                    <p data-message={message.message} data-author={message.name} data-id={message.id}>{message.message}</p>
                </Toast.Body>
                <small className='chat-message--time'>{printFormatDaysAgo(daysAgo)}</small>
            </Toast>
        </>
    )
}

const mapStateToProps = store => {
    return {
        currentRoomId: store.chat.currentRoomId,
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)