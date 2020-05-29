import React, {useEffect, useState} from 'react'
import './style.css'
import SpinnerApp from "../../../common/Spinner";

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import RoomList from '../RoomList'
import Chat from '../Chat'
import Alert from '../../../common/Alert'
import Loader from '../../../common/Loader'
import NavBarRoot from './Navbar'
import {REGION_ROOT} from '../../../redux/types'
import {useChat} from "../../../hooks/useChatFirebase";
import useChatMessageEdit from "../../../hooks/useChatSubscribe/useChatMessageEdit";
import useChatRoomEnterOrExit from "../../../hooks/useChatSubscribe/useChatRoomEnterOrExit";
import {chatUserEnter, chatUserExit} from "../../../redux/actions";
import {connect} from "react-redux";

function Root(props) {
    console.log('Render Root (ENTRY POINT)');
    const {chatUserEnter, chatUserExit} = props;

    const chatDb = useChat();
    const lastMessageEdit = useChatMessageEdit();
    const lastEventRoom = useChatRoomEnterOrExit();
    useEffect( () => {
        if (chatDb.userData) {
            chatUserEnter(chatDb);
        } else {
            chatUserExit()
        }
    }, [chatDb.userData])

    const region = REGION_ROOT;

    return ( !chatDb.userData
        ? <SpinnerApp />
        : <div className="content-wrapper">
              <Header>
                  <NavBarRoot region={region} />
              </Header>

              <Main region={region}>
                  <Chat />
                  <RoomList />
              </Main>

              <Footer>
                  <Alert />
                  <Loader />
              </Footer>
          </div>
    )
}

const mapDispatchToProps = {
    chatUserEnter,
    chatUserExit
}
export default connect(null, mapDispatchToProps)(Root)