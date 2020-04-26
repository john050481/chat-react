import './style.css'
import React, {useEffect} from 'react';
import Modal from "react-bootstrap/Modal";

function ModalApp({openModal, setOpenModal, children}) {

    useEffect( () => {

        const listener = e => e.stopPropagation();

        document.addEventListener('mousedown', listener, true);
        document.addEventListener('touchstart', listener, true);

        return () => {
            document.removeEventListener('mousedown', listener, true);
            document.removeEventListener('touchstart', listener, true);
        };

    },[])

    return (
        <Modal show={openModal} onHide={(e) => {setOpenModal(false)}} >
            {children}
        </Modal>
    )
}

export default ModalApp