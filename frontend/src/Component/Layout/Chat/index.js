import React, {useState} from 'react'
import './style.css'

import Main from '.././../Template/Main'
import Header from '.././../Template/Header'
import Footer from '.././../Template/Footer'

import MessageSender from './MessageSender'
import NavBarChat from './Navbar'
import MessageBlock from './MassageBlock'
import {REGION_MAIN} from '../../../redux/types'

export default function () {
    console.log('Render Chat')

    const region = REGION_MAIN;
    let [render, setRender] = useState(()=>()=>{});

    return (
        <div className="content">
            <Header style={{background: '#f6f6f6'}}>
                <NavBarChat region={region} setRender={setRender}/>
            </Header>

            <Main region={region} render={render}>
                <MessageBlock />
            </Main>

            <Footer style={{background: '#f6f6f6'}}>
                <MessageSender />
            </Footer>
        </div>
    )
}
