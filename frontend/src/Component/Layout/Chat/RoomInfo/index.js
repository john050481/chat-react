import './style.css';
import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import ButtonWithLoader from '../../../../common/ButtonWithLoader';
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";
import {requestUpdateRoomMetadata, showAlert} from '../../../../redux/actions';
import {useChat} from "../../../../hooks/useChatFirebase";

function RoomInfo({currentRoom, showAlert, requestUpdateRoomMetadata}) {

    const chatDb = useChat();

    const [createdByUserId, setCreatedByUserId] = useState(null);
    useEffect( () => {
        (async () => {
            let createdByUserId = await chatDb.getUserData(currentRoom.data.createdByUserId);
            if (createdByUserId) setCreatedByUserId(createdByUserId.name);
        })()
    });

    const [nameChat, setNameChat] = useState(currentRoom.data.name);
    const [visibleLoader, setVisibleLoader] = useState(false);

    function handlerSave(e) {
        setVisibleLoader(true);
        chatDb.updateRoomMetadata(currentRoom.data.id, nameChat, currentRoom.data.type)
            .finally( () => setVisibleLoader(false) )
            .then( () => {
                showAlert({text: 'Update room done!', options: {variant: 'success'}});
                requestUpdateRoomMetadata(currentRoom.data.id, () => chatDb.getRoomMetadata(currentRoom.data.id));
            })
            .catch( e => {
                showAlert({text: e.message, options: {variant: 'danger'}})
            });
    }

    return (
        currentRoom &&
        <div className='room-info-block'>
            <h1>Room info</h1>

            <Form className='room-info-form'>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" value={currentRoom.data.id} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameChat}
                            onChange={(e) =>{setNameChat(e.target.value)}}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" value={currentRoom.data.type} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Created by user ID / name</Form.Label>
                        <Form.Control type="text" value={currentRoom.data.createdByUserId + ' / ' + createdByUserId} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Created at</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Date(currentRoom.data.createdAt.seconds*1000).toLocaleDateString() +
                            ' / ' +
                            new Date(currentRoom.data.createdAt.seconds*1000).toLocaleTimeString()}
                            disabled
                        />
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Last activity</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Date(currentRoom.data.lastActivity.seconds*1000).toLocaleDateString() +
                            ' / ' +
                            new Date(currentRoom.data.lastActivity.seconds*1000).toLocaleTimeString()}
                            disabled
                        />
                    </Form.Group>
                </Form.Row>

                <hr />

                <ButtonWithLoader variant="primary" onClick={handlerSave} visibleLoader={visibleLoader}>
                    Save
                </ButtonWithLoader>
            </Form>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoom: store.chat.rooms.find( room => room.roomId === store.chat.currentRoomId)
    }
}
const mapDispatchToProps = {
    showAlert,
    requestUpdateRoomMetadata
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)