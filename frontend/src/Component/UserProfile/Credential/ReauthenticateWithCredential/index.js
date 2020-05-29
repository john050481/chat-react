import './style.css'
import React, {useEffect, useState, useRef} from 'react';
import ModalApp from "../../../../common/Modal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReauthenticateWithCredential({openModal, setOpenModal, callback}) {
    const inputEmail = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        if (openModal) inputEmail.current.focus();
    }, [openModal])

    useEffect( () => {
        setEmail('');
        setPassword('');
    },[openModal])

    function handlerCallback(e, email, password) {
        callback && callback(e, {email, password});
        setOpenModal(false)
    };

    return (
        <ModalApp openModal={openModal} setOpenModal={setOpenModal} onHide={ (e) => handlerCallback(e, null, null) }>
            <Modal.Header closeButton>
                <Modal.Title>Введите ваши текущие учетные данные</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={inputEmail} type="email" placeholder="Enter current email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => handlerCallback(e, email, password) }>
                    Enter
                </Button>
                <Button variant="secondary" onClick={(e) => handlerCallback(e, null, null) }>
                    Cancel
                </Button>
            </Modal.Footer>
        </ModalApp>
    )
}

export default ReauthenticateWithCredential