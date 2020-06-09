import './style.css';
import React, {useEffect, useState, useRef} from 'react';
import Toast from 'react-bootstrap/Toast'
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";
import useOnScreenUnReadMessage from "../../../../hooks/useOnScreenUnReadMessage";
import {printFormatDate, diffDateInDays, printFormatDaysAgo} from '../../../../common/dates';
import {FaCircle} from "react-icons/fa";

function ChatMessage(props) {
    const {currentRoomId, message, messageBlockScroll} = props;

    const [citationComp, setCitationComp] = useState(null);

    const chatDb = useChat();

    useEffect( () => {
        if (message.citationId)
            (async () => {
                const citationOnDb = await chatDb.getRoomMessage(currentRoomId, message.citationId);
                setCitationComp(citationOnDb);
                if (!messageBlockScroll.current) return;
                messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
            })()
    }, [])

    const chatMessageBlock = useRef();
    const isRead = useOnScreenUnReadMessage(chatMessageBlock, chatDb, message);
    useEffect( () => {
        console.log('isRead ###@@@$$$%%%^^^&&& = ', isRead, message.id);
    }, [isRead]);

    let milliseconds = message.timestamp ? message.timestamp.seconds*1000 : NaN;
    const itsMe = chatDb.userId === message.userId;
    const daysAgo = diffDateInDays(Date.now(), milliseconds);

    return (
        <Toast ref={chatMessageBlock} className={'chat-message' + (itsMe ? ' my' : ' notMy')}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">
                    {itsMe ? "Вы" : message.name }
                </strong>
                <small className='ml-3'>
                    {printFormatDate(milliseconds)}
                </small>
                <FaCircle style={{color: isRead ? 'green' : 'orange', marginLeft: '5px'}} />
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