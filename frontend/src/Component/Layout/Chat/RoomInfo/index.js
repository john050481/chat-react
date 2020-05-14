import './style.css';
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";

function RoomInfo({currentRoom}) {
    return (
        currentRoom &&
        <div className='room-info-block'>
            <h1>Room info</h1>

            <Form className='room-info-form'>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" value={currentRoom.id} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={currentRoom.name} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" value={currentRoom.type} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Created by user ID</Form.Label>
                        <Form.Control type="text" value={currentRoom.createdByUserId} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Created at</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Date(currentRoom.createdAt.seconds*1000).toLocaleDateString() +
                            ' / ' +
                            new Date(currentRoom.createdAt.seconds*1000).toLocaleTimeString()}
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
                            value={new Date(currentRoom.lastActivity.seconds*1000).toLocaleDateString() +
                            ' / ' +
                            new Date(currentRoom.lastActivity.seconds*1000).toLocaleTimeString()}
                            disabled
                        />
                    </Form.Group>
                </Form.Row>

                <hr />

                <Button variant="primary" disabled>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoom: store.chat.currentRoom
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)