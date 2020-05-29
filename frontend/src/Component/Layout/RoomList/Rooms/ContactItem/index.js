import './style.css'
import React from 'react'
import Card from "react-bootstrap/Card";
import {FaUserCircle} from "react-icons/fa";

export default function ContactItem({contact, isSmall}) {
    return (
        <div data-contactid={contact.userId}>
            <Card className='contact'>
                {/*<Card.Header>Quote</Card.Header>*/}
                <Card.Body className='pl-2'>
                    <blockquote className="blockquote mb-0">
                        <div className='contact-header'>
                            <FaUserCircle title={contact.data.name} className='mr-2' size='2em'/>

                            <span hidden={isSmall}>
                                {contact.data.name}
                            </span>
                        </div>
                        <footer className="blockquote-footer text-align-end" hidden={isSmall}>
                            {contact.data.email}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    )
}
