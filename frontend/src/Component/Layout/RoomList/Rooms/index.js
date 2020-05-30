import React, {useEffect, useRef, useState} from "react";
import './style.css';
import {connect, useDispatch} from "react-redux";
import {requestRoomIdMessages, requestUserContacts, requestUserRoomsMetadata} from "../../../../redux/actions";
import SpinnerApp from "../../../../common/Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";
import AccordionApp from '../../../../common/Accordion';
import {FaUserAlt, FaComments} from "react-icons/fa";
import ContactItem from "./ContactItem";
import {equalArrays} from "../../../../common/arrays";
import ContextMenu from "@john0504/react-contextmenu";
import useContextMenu from "../../../../hooks/useContextMenu";
import {itemsContextMenuForRooms, handleClickOnItemRoom} from '../../../../hooks/useContextMenu/contextMenuForRooms';
import {itemsContextMenuForContacts, handleClickOnItemContact} from '../../../../hooks/useContextMenu/contextMenuForContacts';

function Rooms(props) {
    console.log('Render Rooms');

    const {isSmall, rooms, contacts, currentRoomId, requestRoomIdMessages, requestUserRoomsMetadata, requestUserContacts} = props;

    const chatDb = useChat();

    //заполнение rooms & contacts
    useEffect( () => {
        if (!chatDb.userData) return;

        if (!equalArrays(chatDb.userData.rooms, chatDb.prevUserData ? chatDb.prevUserData.rooms : null)) {
            requestUserRoomsMetadata( () => chatDb.getUserRoomsMetadata() );
        } // rooms
        if (!equalArrays(chatDb.userData.contacts, chatDb.prevUserData ? chatDb.prevUserData.contacts : null)) {
            requestUserContacts( () => chatDb.getUserContacts() );
        } // contacts
    }, [chatDb.userData])

    //////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!! ContextMenu
    // доработать, возможно вынести на уроввень выше и использовать там data-contextmenu
    /**/
    const refContainerContextMenu = useRef(null);
    useContextMenu(refContainerContextMenu, handleContextMenu);
    /**/
    const dispatch = useDispatch();
    const [contextMenu, setContextMenu] = useState({visibleContextMenu: false, pageXY: [0, 0], itemsContextMenu: [], callbackOnClickMenu: ()=>{}});
    function handleContextMenu(e) {
        e.preventDefault();

        let curElemRoomId = e.target.closest('[data-roomid]');
        let curElemContactId = e.target.closest('[data-contactid]');

        let itemsContextMenu = [];
        let callbackOnClickMenu = ()=>{};
        if (curElemRoomId) {
            const roomId = curElemRoomId.dataset.roomid;
            itemsContextMenu = itemsContextMenuForRooms;
            callbackOnClickMenu = (data, parentLiElem) => handleClickOnItemRoom(data, roomId, dispatch);
        } else if (curElemContactId) {
            const contactId = curElemContactId.dataset.contactid;
            itemsContextMenu = itemsContextMenuForContacts;
            callbackOnClickMenu = (data, parentLiElem) => handleClickOnItemContact(data, contactId, dispatch);
        }

        if (curElemRoomId || curElemContactId)
            setContextMenu({visibleContextMenu: true, pageXY: [e.pageX, e.pageY], itemsContextMenu, callbackOnClickMenu});
    }
    /////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

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
        <div className='rooms' onClick={handleClick} ref={refContainerContextMenu}>
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
                visible={contextMenu.visibleContextMenu}
                hideMenu={ () => setContextMenu({...contextMenu, visibleContextMenu: false} ) }
                pageXY={contextMenu.pageXY}
                items={contextMenu.itemsContextMenu}
                callbackOnClickMenu={contextMenu.callbackOnClickMenu}
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
    requestUserRoomsMetadata,
    requestUserContacts,
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)