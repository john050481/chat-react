import './style.css';
import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";
import {showAlert} from '../../../redux/actions';
import {useChat} from "../../../hooks/useChatFirebase";
import AccordionApp from '../../../common/Accordion';
import ButtonWithLoader from '../../../common/ButtonWithLoader';

function Profile({user, showAlert}) {
    console.log('Render Profile')

    const chatDb = useChat();

    const [nameUser, setNameUser] = useState(user.name);
    const [visibleLoader, setVisibleLoader] = useState(false);

    function handlerSave(e) {
        setVisibleLoader(true);
        chatDb.updateUser(user.id, {name: nameUser})
            .finally( () => setVisibleLoader(false) )
            .then( () => {
                showAlert({text: 'Update user done!', options: {variant: 'success'}});
            })
            .catch( e => {
                showAlert({text: e.message, options: {variant: 'danger'}})
            });
    }

    return (
        user &&
        <div className='profile-block'>
            <h1>Profile</h1>


            <AccordionApp isOpen={true} title='Основное' >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameUser}
                            onChange={(e) =>{setNameUser(e.target.value)}}
                        />
                    </Form.Group>
                </Form.Row>
            </AccordionApp>

            <AccordionApp title='Дополнительно' >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" value={user.id} disabled/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={user.email} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" value={user.website} disabled/>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Last activity</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Date(user.lastActivity.seconds*1000).toLocaleDateString() +
                            ' / ' +
                            new Date(user.lastActivity.seconds*1000).toLocaleTimeString()}
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
        user: store.chat.user
    }
}
const mapDispatchToProps = {
    showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)