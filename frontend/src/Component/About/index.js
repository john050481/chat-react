import React from 'react'
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export default function(props) {
    return (
        <Jumbotron>
            <h1>Приложение Chat-react!</h1>
            <p>Внешнее API:</p>
            <ul>
                <li>Аутентификация: <a target='_blank' href={'https://firebase.google.com/docs/auth/web/start'}>Firebase</a></li>
                <li>Эмоджи: <a target='_blank' href={'https://emoji-api.com'}>Emoji API</a></li>
                <li>Данные: <a target='_blank' href={'https://jsonplaceholder.typicode.com/'}>JSONPlaceholder</a></li>
            </ul>
            <p>
                <Button variant="primary" href={'https://github.com/john050481/chat-react'}>Learn more</Button>
            </p>
        </Jumbotron>
    )
}