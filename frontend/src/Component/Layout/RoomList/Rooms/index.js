import React from "react";
import './style.css';
import {connect} from "react-redux";
import {requestRoomIdMessages} from "../../../../redux/actions";
import SpinnerApp from "../../../Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";

function Rooms({isSmall, rooms, currentRoomId, requestRoomIdMessages}) {

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
        currentRoomId: store.chat.currentRoomId,
        rooms: store.chat.rooms,
    }
}

const mapDispatchToProps = {
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)