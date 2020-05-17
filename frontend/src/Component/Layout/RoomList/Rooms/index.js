import React from "react";
import './style.css';
import {connect} from "react-redux";
import {requestRoomIdMessages} from "../../../../redux/actions";
import SpinnerApp from "../../../Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";
import AccordionApp from '../Accordion';
import {FaUserAlt, FaComments} from "react-icons/fa";

function Rooms({isSmall, rooms, contacts, currentRoomId, requestRoomIdMessages}) {

    const chatDb = useChat();

    function handleClick(e) {
        let curElemRoomId = e.target.closest('[data-roomid]');
        if (curElemRoomId) {
            let roomId = curElemRoomId.dataset.roomid;
            if ( roomId !== (currentRoomId ? currentRoomId : null) ) {
                requestRoomIdMessages( roomId, () => chatDb.getRoomMessages(roomId) );
            }
        }
    }

    return (
        <div className='rooms' onClick={handleClick}>
            <AccordionApp defaultActiveKey='0' title='Чаты' isSmall={isSmall} Icon={FaComments}>
                {   (!rooms.length)
                    ? <SpinnerApp />
                    : rooms.map(room =>
                        <RoomItem key={room.roomId} room={room} isSmall={isSmall} />
                    )
                }
            </AccordionApp>
            <AccordionApp defaultActiveKey='0' title='Контакты' isSmall={isSmall} Icon={FaUserAlt}>
                {   (!contacts.length)
                    ? <SpinnerApp />
                    : contacts.map(contact =>
                        <div key={contact.userId}>
                            {contact.data.name} / {contact.data.email}
                        </div>
                    )
                }
            </AccordionApp>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoomId: store.chat.currentRoomId,
        rooms: store.chat.rooms,
        contacts: store.chat.contacts
    }
}

const mapDispatchToProps = {
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)