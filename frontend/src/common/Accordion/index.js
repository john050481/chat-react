import './style.css';
import React, {useState} from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

export default function AccordionApp(props) {
    const {isOpen, title, isSmall, Icon, children, ...rest} = props;

    const [toggleOpen, setToggleOpen] = useState(!!isOpen);

    function handleOnClick(e) {
        setToggleOpen(!toggleOpen);
    }

    return (
        <Accordion className='accordion-app' defaultActiveKey={isOpen? "0" : ""} {...rest} >
            <Card>
                <Card.Header className='accordion-app--card-header'>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" title={title} onClick={handleOnClick}>
                        {
                            !isSmall
                            ? title
                            : Icon ? <Icon size='1em' /> : '...'

                        }
                        {
                            toggleOpen
                            ? <IoIosArrowUp size='1em' />
                            : <IoIosArrowDown size='1em' />
                        }
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className='accordion-app--card-body'>
                        {children}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}