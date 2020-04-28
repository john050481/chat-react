import './style.css';
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";

function ChatInfo({chatInfo}) {
    return (
        chatInfo &&
        <div className='chat-info-block'>
            <h1>Chat / contact info</h1>

            <Form className='chat-info-form'>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={chatInfo.name} disabled/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={chatInfo.username} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={chatInfo.email} disabled/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" value={chatInfo.phone} disabled/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" value={chatInfo.website} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={chatInfo.address.street} disabled/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control value={chatInfo.address.suite} disabled/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={chatInfo.address.city} disabled/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" value="Choose..." disabled>
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control value={chatInfo.address.zipcode} disabled/>
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" disabled/>
                </Form.Group>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" value={chatInfo.company.name} disabled/>
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
        chatInfo: store.chat.chatInfo
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo)