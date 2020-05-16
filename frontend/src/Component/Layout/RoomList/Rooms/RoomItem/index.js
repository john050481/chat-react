import './style.css'
import React from 'react'
import Card from "react-bootstrap/Card";
import Loader from "../../../../Loader";
import {FaUserCircle} from "react-icons/fa";
import {connect} from "react-redux";

function RoomItem({room, isSmall, requestRoomId, loader, currentRoom}) {
    const roomId = currentRoom ? currentRoom.id : null;

    let seconds = room.data.lastActivity ? room.data.lastActivity.seconds*1000 : Date.now();

    return (
        <div data-roomid={room.roomId}>
            <Card className={ 'chat' + (roomId === room.roomId ? ' active' : '') }>
                {/*<Card.Header>Quote</Card.Header>*/}
                <Card.Body className='pl-2'>
                    <blockquote className="blockquote mb-0">
                        <div className='chat-header'>
                            {loader && requestRoomId === room.roomId
                                ? <Loader className='mr-2' />
                                : <FaUserCircle title={room.data.name} className='mr-2' size='2em'/>
                            }

                            <span className={'chat__name'} hidden={isSmall}>
                                        {room.data.name}
                                      </span>
                        </div>
                        <footer className="blockquote-footer text-align-end" hidden={isSmall}>
                            {new Date(seconds).toLocaleDateString()} {' / '}
                            {new Date(seconds).toLocaleTimeString()}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        loader: store.app.loader.visible,
        currentRoom: store.chat.currentRoom,
        requestRoomId: store.chat.requestRoomId

    }
}

export default connect(mapStateToProps, null)(RoomItem)