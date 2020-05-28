import React, {useState} from 'react'
import './style.css'

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import RoomList from '../RoomList'
import Chat from '../Chat'
import Alert from '../../Alert'
import Loader from '../../Loader'
import NavBarRoot from './Navbar'
import {REGION_ROOT} from '../../../redux/types'

export default function (props) {
    console.log('Render Root (ENTRY POINT)');

    const region = REGION_ROOT;

    return (
        <div className="content-wrapper">
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