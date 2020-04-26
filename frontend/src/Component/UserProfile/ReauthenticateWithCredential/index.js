import './style.css'
import React, {useEffect, useState} from 'react';
import ModalApp from "../../Modal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReauthenticateWithCredential({openModal, setOpenModal, callback}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        console.log('openModal ===', openModal);
        setEmail('');
        setPassword('');
    },[openModal])

    return (
        <ModalApp openModal={openModal} setOpenModal={setOpenModal} onHide={ (e) => {callback(e, null); setOpenModal(false)} }>
            <Modal.Header closeButton>
                <Modal.Title>Введите ваши текущие учетные данные</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter current email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => { callback(e, {email, password}); setOpenModal(false) }}>
                    Enter
                </Button>
                <Button variant="secondary" onClick={(e) => { callback(e, null); setOpenModal(false)} }>
                    Cancel
                </Button>
            </Modal.Footer>
        </ModalApp>
    )
}

export default ReauthenticateWithCredential