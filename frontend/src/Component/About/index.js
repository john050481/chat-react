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
                <li>Javascript</li>
                <ul>
                    <li>promise</li>
                    <li>async/await</li>
                    <li>...</li>
                </ul>
                <li>React</li>
                <ul>
                    <li>HOC</li>
                    <li>hook</li>
                    <li>render prop</li>
                    <li>prop-types</li>
                    <li>react-router-dom</li>
                    <li>...</li>
                </ul>
                <li>Redux</li>
                <ul>
                    <li>connect</li>
                    <li>hook</li>
                    <li>middleware</li>
                    <li>devtools</li>
                    <li>redux-saga</li>
                    <li>redux-thunk</li>
                    <li>...</li>
                </ul>
            </ul>
            <h2>Внешнее источники/компоненты:</h2>
            <ul>
                <li>Аутентификация: <a target='_blank' href={'https://firebase.google.com/docs/auth/web/start'}>Firebase Authentication</a></li>
                <li>База данных: <a target='_blank' href={'https://firebase.google.com/docs/firestore/quickstart'}>Cloud Firestore</a></li>
                <li>Фома аутентификации: <a target='_blank' href={'https://www.npmjs.com/package/@john0504/react-authform'}>@john0504/react-authform</a></li>
                <li>Контекстное меню: <a target='_blank' href={'https://www.npmjs.com/package/@john0504/react-contextmenu'}>@john0504/react-contextmenu</a></li>
                <li>Эмоджи: <a target='_blank' href={'https://emoji-api.com'}>Emoji API</a></li>
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