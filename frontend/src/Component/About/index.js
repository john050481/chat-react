import './style.css'
import React from 'react'
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export default function(props) {
    return (
        <Jumbotron className='about-app'>
            <h1>Приложение Chat-react!</h1>
            <hr />
            <h2>Использовалось:</h2>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Redux-saga</li>
                <li>Redux middleware</li>
                <li>React hooks</li>
                <li>React-router</li>
            </ul>
            <h2>Внешнее API:</h2>
            <ul>
                <li>Аутентификация: <a target='_blank' href={'https://firebase.google.com/docs/auth/web/start'}>Firebase</a></li>
                <li>Эмоджи: <a target='_blank' href={'https://emoji-api.com'}>Emoji API</a></li>
                <li>Данные: <a target='_blank' href={'https://jsonplaceholder.typicode.com/'}>JSONPlaceholder</a></li>
                <li>Хуки: <a target='_blank' href={'https://usehooks.com'}>useHooks.com</a></li>
            </ul>
            <p>
                <Button variant="primary" href={'https://github.com/john050481/chat-react'}>Learn more</Button>
            </p>
        </Jumbotron>
    )
}