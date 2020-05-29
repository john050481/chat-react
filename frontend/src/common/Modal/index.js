import './style.css'
import React, {useEffect} from 'react';
import Modal from "react-bootstrap/Modal";

function ModalApp({openModal, setOpenModal, children, ...props}) {

    // Делаем так чтоб эффект срабатывал на погружении и останавливался: e.stopPropagation(),
    // т.к. в хуке "useOnClickOutside.js" используются события "mousedown" и "touchstart"
    // вешаем "addEventListener" только если модалка открыта: useEffect(..., [openModal])
    useEffect( () => {
        if (!openModal) return;

        const listener = e => e.stopPropagation();

        document.addEventListener('mousedown', listener, true);
        document.addEventListener('touchstart', listener, true);

        return () => {
            document.removeEventListener('mousedown', listener, true);
            document.removeEventListener('touchstart', listener, true);
        };

    },[openModal])

    return (
        <Modal show={openModal} onHide={(e) => {setOpenModal(false)}} {...props}>
            {children}
        </Modal>
    )
}

export default ModalApp