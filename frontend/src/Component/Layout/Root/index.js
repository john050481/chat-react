import React, {useEffect} from 'react'
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
import useChatMessageEvents from "../../../hooks/useChatSubscribe/useChatMessageEvents";
import useChatRoomEvents from "../../../hooks/useChatSubscribe/useChatRoomEvents";
import {chatUserUpdate, chatUserExit} from "../../../redux/actions";
import {connect} from "react-redux";

const region = REGION_ROOT;

function Root({chatUserUpdate, chatUserExit}) {
    console.log('Render Root (ENTRY POINT)');

    const chatDb = useChat();
    const lastMessageEdit = useChatMessageEvents();
    const lastEventRoom = useChatRoomEvents();
    useEffect( () => {
        if (chatDb.userData) {
            chatUserUpdate(chatDb);
        } else {
            chatUserExit()
        }
    }, [chatDb.userData])

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
    chatUserUpdate,
    chatUserExit
}
export default connect(null, mapDispatchToProps)(Root)