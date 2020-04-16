import React, {useState, useEffect} from 'react'
import './style.css'

import Chats from './Chats'

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import NavBarChatList from './Navbar'
import {REGION_SIDEBAR} from '../../../redux/types'
import {requestChats} from "../../../redux/actions";
import {connect} from "react-redux";

function ChatList(props) {
    console.log('Render ChatList')

    const region = REGION_SIDEBAR;
    let [render, setRender] = useState(()=>()=>{});

    useEffect( () => {
        props.requestChats();
    }, [])

    return (
        <div className="flx sidebar-chats">
            <Header style={{background: '#D3D3D3'}}>
                <NavBarChatList region={region} setRender={setRender}/>
            </Header>

            <Main region={region} render={render}>
                <aside className="sidebar">
                    {/* RENDER CONTACTS/CHATS {...props} */}
                    <Chats chats={props.chats}/>
                </aside>
            </Main>

            <Footer style={{background: '#D3D3D3'}}/>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chats: store.chat.chats
    }
}
const mapDispatchToProps = {
    requestChats
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)