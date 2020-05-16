import React from "react";
import './style.css';
import {connect} from "react-redux";
import {requestRoomAndMessages} from "../../../../redux/actions";
import SpinnerApp from "../../../Spinner";
import RoomItem from './RoomItem';
import {useChat} from "../../../../hooks/useChatFirebase";

function Rooms({isSmall, rooms, currentRoomId, requestRoomAndMessages}) {

    const chatDb = useChat();

    function handleClick(e) {
        let curElemRoomId = e.target.closest('[data-roomid]');
        if (curElemRoomId) {
            let roomId = curElemRoomId.dataset.roomid;
            if ( roomId !== (currentRoomId ? currentRoomId : null) ) {
                requestRoomAndMessages( roomId, () => chatDb.getRoomMetadata(roomId), () => chatDb.getRoomMessages(roomId) );
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
    requestRoomAndMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)