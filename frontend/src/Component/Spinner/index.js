import './style.css'
import React from 'react'
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

export default function SpinnerApp(props) {
    return (
        <Container className='spinner-app-container'>
            <Spinner className='spinner-app' animation="grow" variant="info" {...props} />
        </Container>
    )
}
