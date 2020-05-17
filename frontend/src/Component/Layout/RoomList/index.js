import React, {useState, useEffect} from 'react'
import './style.css'

import Rooms from './Rooms'
import NavBarRoomList from './Navbar'

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import {REGION_SIDEBAR} from '../../../redux/types'
import {requestUserRoomsMetadata, requestUserContacts} from "../../../redux/actions";
import {connect} from "react-redux";

import {useDebounce} from '../../../hooks/useDebounce';
import {useWindowSize} from '../../../hooks/useWindowSize';
import {useChat} from "../../../hooks/useChatFirebase";
import useChatMessageAdd from './useChatMessageAdd';
import useChatRoomEnterOrExit from "./useChatRoomEnterOrExit";
const MAX_WIDTH = 600;//px

function RoomList({requestUserRoomsMetadata, requestUserContacts}) {
    console.log('Render RoomList')

    const chatDb = useChat();
    const lastMessage = useChatMessageAdd();
    const lastEventRoom = useChatRoomEnterOrExit();

    //уменьшение сайдбара, при ширене экрана менее MAX_WIDTH, с задержкой в 1сек
    const [isSmall, setIsSmall] = useState(false);
    const windowSize = useWindowSize();
    const debouncedIsSmall = useDebounce(windowSize.width && windowSize.width < MAX_WIDTH, 1000);
    useEffect( () => {
        setIsSmall(debouncedIsSmall)
    }, [debouncedIsSmall])

    const region = REGION_SIDEBAR;
    let [render, setRender] = useState(()=>()=>{});

    //заполнение roomlist
    useEffect( () => {
        if (!chatDb.userData) return;

        requestUserRoomsMetadata( () => chatDb.getUserRoomsMetadata() );
        requestUserContacts( () => chatDb.getUserContacts() );
    }, [chatDb.userData])

    return (
        <div className={"flx sidebar-rooms" + ( isSmall ? ' small' : '' )}>
            <Header style={{background: '#D3D3D3'}}>
                <NavBarRoomList region={region} setRender={setRender} isSmall={isSmall} setIsSmall={setIsSmall}/>
            </Header>

            <Main region={region} render={render}>
                <aside className="sidebar">
                    <Rooms isSmall={isSmall}/>
                </aside>
            </Main>

            <Footer style={{background: '#D3D3D3'}}>
                {/*любые теги или компоненты*/}
            </Footer>
        </div>
    )
}

const mapDispatchToProps = {
    requestUserRoomsMetadata,
    requestUserContacts
}

export default connect(null, mapDispatchToProps)(RoomList)