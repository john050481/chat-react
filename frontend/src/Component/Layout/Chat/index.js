import React, {useState} from 'react'
import './style.css'

import Main from '.././../Template/Main'
import Header from '.././../Template/Header'
import Footer from '.././../Template/Footer'

import MessageSender from './MessageSender'
import NavBarChat from './Navbar'
import {REGION_MAIN} from '../../../redux/types'

export default function () {
    console.log('Render Chat')
    const region = REGION_MAIN;
    let [render, setRender] = useState(()=>()=>{});

    const [citation, setCitation] = useState('');

    function handleClick(e) {
        let target = e.target;
        let message = target.closest('[data-message]')
        if (message) {
            setCitation(message.innerText)
        }
    }

    return (
        <div className="content">
            <Header style={{background: '#f6f6f6'}}>
                <NavBarChat region={region} setRender={setRender}/>
            </Header>

            <Main region={region} render={render}>
                <main
                    className="content main-content message-block"
                    onClick={handleClick}
                />
            </Main>

            <Footer style={{background: '#f6f6f6'}}>
                <MessageSender citation={citation} setCitation={setCitation} />
            </Footer>
        </div>
    )
}
