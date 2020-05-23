import React, {useState} from "react";
import './style.css';
import {connect} from "react-redux";
import {requestRoomIdMessages} from "../../../../redux/actions";
import SpinnerApp from "../../../Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";
import AccordionApp from '../../../../common/Accordion';
import {FaUserAlt, FaComments} from "react-icons/fa";
import ContactItem from "./ContactItem";
import ContextMenu from "@john0504/react-contextmenu";

function Rooms({isSmall, rooms, contacts, currentRoomId, requestRoomIdMessages}) {

    const chatDb = useChat();

    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [pageXY, setPageXY] = useState([0, 0]);
    function handleContextMenu(e) {
        e.preventDefault();

        let curElemContactId = e.target.closest('[data-contactid]');
        console.log(curElemContactId);

        let curElemRoomId = e.target.closest('[data-roomid]');
        console.log(curElemRoomId);

        console.log(e.pageX, e.pageY);
        setPageXY([e.pageX, e.pageY])
        setVisibleContextMenu(true);
    }
    
    function handleClick(e) {
        let curElemContactId = e.target.closest('[data-contactid]');
        console.log(curElemContactId);

        let curElemRoomId = e.target.closest('[data-roomid]');
        if (curElemRoomId) {
            let roomId = curElemRoomId.dataset.roomid;
            if ( roomId !== (currentRoomId ? currentRoomId : null) ) {
                requestRoomIdMessages( roomId, () => chatDb.getRoomMessages(roomId) );
            }
        }
    }

    return (
        <div className='rooms' onClick={handleClick} onContextMenu={handleContextMenu}>
            <AccordionApp isOpen={true} title='Чаты' isSmall={isSmall} Icon={FaComments}>
                {   (!rooms.length)
                    ? <SpinnerApp />
                    : rooms.map(room =>
                        <RoomItem key={room.roomId} room={room} isSmall={isSmall} />
                    )
                }
            </AccordionApp>
            <AccordionApp isOpen={true} title='Контакты' isSmall={isSmall} Icon={FaUserAlt}>
                {   (!contacts.length)
                    ? <SpinnerApp />
                    : contacts.map(contact =>
                        <ContactItem key={contact.userId} contact={contact} isSmall={isSmall} />
                    )
                }
            </AccordionApp>
            <ContextMenu
                className={'react-contextmenu rooms__contextmenu'}
                visible={visibleContextMenu}
                hideMenu={ () => setVisibleContextMenu(false) }
                pageXY={pageXY}
                /*items={items}*/
                callbackOnClickMenu={(data, parentLiElem) => {
                    console.log(data, parentLiElem);
                }}
            />
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