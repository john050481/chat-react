import './style.css';
import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function AccordionApp(props) {
    const {defaultActiveKey, title, isSmall, Icon, children, ...rest} = props;

    return (
        <Accordion className='accordion-app' defaultActiveKey={defaultActiveKey} {...rest} >
            <Card>
                <Card.Header className='accordion-app--card-header'>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" title={title}>
                        {
                            !isSmall
                            ? title
                            : Icon ? <Icon size='1em' /> : '...'

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