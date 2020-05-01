import React from 'react';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ButtonWithLoader({variant, onClick, visibleLoader, children}) {
    return (
        <Container>
            <Row>
                <Col>
                    <Button variant={variant} onClick={onClick}>
                        {children}
                    </Button>
                </Col>
            {
                visibleLoader &&
                <Col>
                    <Spinner variant={variant} animation="border" />
                </Col>
            }
            </Row>
        </Container>
    )
}