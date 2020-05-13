import React, {useState, useEffect} from 'react'
import './style.css'

import Chats from './Chats'
import NavBarChatList from './Navbar'

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import {REGION_SIDEBAR} from '../../../redux/types'
import {requestChats} from "../../../redux/actions";
import {connect} from "react-redux";

import {useDebounce} from '../../../hooks/useDebounce';
import {useWindowSize} from '../../../hooks/useWindowSize';
import {useChat} from "../../../hooks/useChatFirebase";
const MAX_WIDTH = 600;//px

function ChatList({requestChats}) {
    console.log('Render ChatList')

    const chatDb = useChat();

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
        requestChats('ARGS1', 'ARGS2'); //payload = chatDb.userData.rooms || [] //???
        console.log('@@@@@@@@@@@@@@@@@@@@@@@ === ', chatDb.userData);
        if (!chatDb.userData) return;

        (async () => {
            let res = await chatDb.getUserRoomsMetadata();
            console.log('!!!!!!!!!!1 = = = ', res, chatDb.userData);
        })()

    }, [chatDb.userData])

    useEffect( () => {

        const handlerEventMessageAdd = ({detail}) => console.log('detail message ADD  === ', detail);
        chatDb.addEventListener('message-add', handlerEventMessageAdd);

        return () => chatDb.removeEventListener('message-add', handlerEventMessageAdd);
    }, [])

    return (
        <div className={"flx sidebar-chats" + ( isSmall ? ' small' : '' )}>
            <Header style={{background: '#D3D3D3'}}>
                <NavBarChatList region={region} setRender={setRender} isSmall={isSmall} setIsSmall={setIsSmall}/>
            </Header>

            <Main region={region} render={render}>
                <aside className="sidebar">
                    <Chats isSmall={isSmall}/>
                </aside>
            </Main>

            <Footer style={{background: '#D3D3D3'}}>
                {/*любые теги или компоненты*/}
            </Footer>
        </div>
    )
}

const mapDispatchToProps = {
    requestChats
}

export default connect(null, mapDispatchToProps)(ChatList)