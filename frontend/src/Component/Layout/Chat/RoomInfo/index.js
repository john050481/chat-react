import './style.css';
import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import ButtonWithLoader from '../../../../common/ButtonWithLoader';
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";
import {requestUpdateRoomMetadata, showAlert} from '../../../../redux/actions';
import {useChat} from "../../../../hooks/useChatFirebase";
import AccordionApp from '../../../../common/Accordion';
import {printFormatDate} from '../../../../common/dates';

function RoomInfo({currentRoom, showAlert, requestUpdateRoomMetadata}) {

    const chatDb = useChat();

    const [createdByUserEmail, setCreatedByUserEmail] = useState(null);
    useEffect( () => {
        (async () => {
            let createdByUser = await chatDb.getUserData(currentRoom.data.createdByUserId);
            if (createdByUser) setCreatedByUserEmail(createdByUser.email);
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

                <AccordionApp isOpen={true} title='Основное' >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>
                                Name {currentRoom.data.type === 'private' ? ' (Room is private! Name cannot be changed!)' : ''}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                disabled = {currentRoom.data.type === 'private'}
                                value={nameChat}
                                onChange={(e) =>{setNameChat(e.target.value)}}
                            />
                        </Form.Group>
                    </Form.Row>
                </AccordionApp>

                <AccordionApp title='Дополнительно' >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={currentRoom.data.id} disabled/>
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
                            <Form.Label>Created by user ID / email</Form.Label>
                            <Form.Control type="text" value={currentRoom.data.createdByUserId + ' / ' + createdByUserEmail} disabled/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Created at</Form.Label>
                            <Form.Control
                                type="text"
                                value={printFormatDate(currentRoom.data.createdAt ? currentRoom.data.createdAt.seconds*1000 : NaN)}
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
                                value={printFormatDate(currentRoom.data.lastActivity ? currentRoom.data.lastActivity.seconds*1000 : NaN)}
                                disabled
                            />
                        </Form.Group>
                    </Form.Row>
                </AccordionApp>

                <ButtonWithLoader variant="primary" onClick={handlerSave} visibleLoader={visibleLoader}>
                    Save
                </ButtonWithLoader>
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