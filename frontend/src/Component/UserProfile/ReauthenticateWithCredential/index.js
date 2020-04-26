import './style.css'
import React, {useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReauthenticateWithCredential(props) {

    useEffect( () => {

        function listener(e) {
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
            e.stopPropagation();
        }

        document.addEventListener('mousedown', listener, true);
        document.addEventListener('touchstart', listener, true);

        return () => {
            document.removeEventListener('mousedown', listener, true);
            document.removeEventListener('touchstart', listener, true);
        };

    },[])

    return (
        <div
            onClickCapture={(e) => {
                //e.stopPropagation();
                console.log('11111###########################')
            }}
            onMouseDownCapture={(e) => {
                //e.stopPropagation();
                console.log('22222###########################')
            }}
            onClick={(e) => {
                //e.stopPropagation();
                console.log('33333###########################')
            }}
            onMouseDown={(e) => {
                //e.stopPropagation();
                console.log('44444###########################')
            }}
        >
            <Modal show={props.show} onHide={(e) => {}} >
                <Modal.Header closeButton>
                    <Modal.Title>Введите ваши текущие учетные данные</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter current email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter current password" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => {}}>
                        Enter
                    </Button>
                    <Button variant="secondary" onClick={(e) => {}}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReauthenticateWithCredential