import './style.css'
import React from 'react'
import Card from "react-bootstrap/Card";
import Loader from "../../../../../common/Loader";
import {FaComments, FaVolumeUp, FaVolumeMute} from "react-icons/fa";
import {IoIosArrowDown} from 'react-icons/io';
import {connect} from "react-redux";
import {printFormatDate} from '../../../../../common/dates';

function RoomItem({room, isSmall, requestRoomId, loader, currentRoomId, roomIsMuted, numberUnreadMessage}) {
    console.log("numberUnreadMessagenumberUnreadMessagenumberUnreadMessagenumberUnreadMessage", numberUnreadMessage);
    return (
        <div className="chat-wrapper" data-roomid={room.roomId}>
            <Card className={ 'chat' + (currentRoomId === room.roomId ? ' active' : '') }>
                {/*<Card.Header>Quote</Card.Header>*/}
                <Card.Body className='pl-2'>
                    <blockquote className="blockquote mb-0">
                        <div className='chat-header'>
                            {loader && requestRoomId === room.roomId && currentRoomId !== requestRoomId
                                ? <Loader className='mr-2' />
                                : <FaComments title={room.data.name} className='mr-2' size='2em'/>
                            }

                            <span className={'chat__name'} hidden={isSmall}>
                                        {room.data.name}
                                      </span>
                        </div>
                        <footer className="blockquote-footer text-align-end" hidden={isSmall}>
                            {printFormatDate(room.data.lastActivity ? room.data.lastActivity.seconds*1000 : NaN)}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            <div className="chat-muted">
                {`UNREAD: ${numberUnreadMessage}   `}
                {
                    roomIsMuted
                        ? <FaVolumeMute style={{color: "#6c757d"}} />
                        : <FaVolumeUp style={{color: "#28a745"}} />
                }
            </div>
            <div className="chat-menu" data-menu={true} hidden={isSmall}>
                <IoIosArrowDown />
            </div>
        </div>
    )
}

const mapStateToProps = (store, ownProps) => {
    return {
        loader: store.app.loader.visible,
        currentRoomId: store.chat.currentRoomId,
        requestRoomId: store.chat.requestRoomId,
        numberUnreadMessage: store.chat.roomsUnreadMessage.find( item => item.roomId === ownProps.room.roomId)?.numberUnreadMessages
    }
}

export default connect(mapStateToProps, null)(RoomItem)