import React from "react";
import './style.css';
import {connect} from "react-redux";
import {requestRoom} from "../../../../redux/actions";
import SpinnerApp from "../../../Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";

function Rooms({isSmall, rooms, currentRoom, requestRoom}) {

    const chatDb = useChat();

    function handleClick(e) {
        let curElemRoomId = e.target.closest('[data-roomid]');
        if (curElemRoomId) {
            let roomId = curElemRoomId.dataset.roomid;
            if ( roomId !== (currentRoom ? currentRoom.id : null) ) {
                requestRoom( roomId, () => chatDb.getRoomMetadata(roomId), () => chatDb.getRoomMessages(roomId) );
            }
        }
    }

    return (
        <div className='rooms' onClick={handleClick}>
            {   (!rooms.length)
                ? <SpinnerApp />
                : rooms.map(room =>
                      <RoomItem key={room.roomId} room={room} isSmall={isSmall} />
                  )
            }
        </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoom: store.chat.currentRoom,
        rooms: store.chat.rooms,
    }
}

const mapDispatchToProps = {
    requestRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)