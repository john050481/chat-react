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

import {useDebounce} from '../../../hooks/useDebounce';
import {useWindowSize} from '../../../hooks/useWindowSize';
const MAX_WIDTH = 600;//px

function ChatList(props) {
    console.log('Render ChatList')

    //уменьшение сайдбара, при ширене экрана менее MAX_WIDTH, с задержкой в 1сек
    const [isSmall, setIsSmall] = useState(false);
    const windowSize = useWindowSize();
    const debouncedIsSmall = useDebounce(windowSize.width && windowSize.width < MAX_WIDTH, 1000);
    useEffect( () => {
        setIsSmall(debouncedIsSmall)
    }, [debouncedIsSmall])

    const region = REGION_SIDEBAR;
    let [render, setRender] = useState(()=>()=>{});

    useEffect( () => {
        props.requestChats();
    }, [])

    return (
        <div className={"flx sidebar-chats" + ( isSmall ? ' small' : '' )}>
            <Header style={{background: '#D3D3D3'}}>
                <NavBarChatList region={region} setRender={setRender} isSmall={isSmall} setIsSmall={setIsSmall}/>
            </Header>

            <Main region={region} render={render}>
                <aside className="sidebar">
                    {/* RENDER CONTACTS/CHATS {...props} */}
                    <Chats chats={props.chats} isSmall={isSmall}/>
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