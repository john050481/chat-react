import React, {useState} from 'react'
import './style.css'

import Main from '.././../Template/Main'
import Header from '.././../Template/Header'
import Footer from '.././../Template/Footer'

import MessageSender from './MessageSender'
import NavBarChat from './Navbar'
import MessageBlock from './MassageBlock'
import {REGION_CHAT} from '../../../redux/types'

export default function () {
    console.log('Render Chat (ENTRY POINT)')

    const region = REGION_CHAT;

    return (
        <div className="content">
            <Header style={{background: '#f6f6f6'}}>
                <NavBarChat region={region} />
            </Header>

            <Main region={region}>
                <MessageBlock />
            </Main>

            <Footer style={{background: '#f6f6f6'}}>
                <MessageSender />
            </Footer>
        </div>
    )
}
