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
                <li>Javascript (Promise, async/await)</li>
                <li>React (HOC, render prop, prop-types)</li>
                <li>Redux (connect, middleware, devtools)</li>
                <li>Redux-saga</li>
                <li>React hooks</li>
                <li>React-router (router dom)</li>
            </ul>
            <h2>Внешнее источники/компоненты:</h2>
            <ul>
                <li>Аутентификация: <a target='_blank' href={'https://firebase.google.com/docs/auth/web/start'}>Firebase</a></li>
                <li>Фома аутентификации: <a target='_blank' href={'https://www.npmjs.com/package/@john0504/react-authform'}>@john0504/react-authform</a></li>
                <li>Контекстное меню: <a target='_blank' href={'https://www.npmjs.com/package/@john0504/react-contextmenu'}>@john0504/react-contextmenu</a></li>
                <li>Эмоджи: <a target='_blank' href={'https://emoji-api.com'}>Emoji API</a></li>
                <li>Данные: <a target='_blank' href={'https://jsonplaceholder.typicode.com/'}>JSONPlaceholder</a></li>
                <li>Хуки: <a target='_blank' href={'https://usehooks.com'}>useHooks.com</a></li>
                <li>Bootstrap: <a target='_blank' href={'https://react-bootstrap.github.io/components/'}>React-bootstrap</a></li>
                <li>Icons: <a target='_blank' href={'https://react-icons.netlify.app/'}>React-icons</a></li>
                <li>Effects: <a target='_blank' href={'https://reactcommunity.org/react-transition-group/'}>React-transition-group</a></li>
            </ul>
            <p>
                <Button variant="primary" href={'https://github.com/john050481/chat-react'}>Learn more</Button>
            </p>
        </Jumbotron>
    )
}