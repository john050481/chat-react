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
import useVisibilityChange from "../../../hooks/useVisibilityChange";
import useWindowFocus from "../../../hooks/useWindowFocus";
import {chatUserUpdate, chatUserExit, visibilityChange, appFocusUpdate} from "../../../redux/actions";
import {connect} from "react-redux";

const region = REGION_ROOT;

function Root({chatUserUpdate, chatUserExit, visibilityChange, appFocusUpdate}) {
    console.log('Render Root (ENTRY POINT)');

    let appIsVisible = useVisibilityChange();
    useEffect( () => {
        visibilityChange(appIsVisible);
    }, [appIsVisible])

    let appInFocus = useWindowFocus();
    useEffect( () => {
        appFocusUpdate(appInFocus);
    }, [appInFocus])

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
    chatUserExit,
    visibilityChange,
    appFocusUpdate
}
export default connect(null, mapDispatchToProps)(Root)