import React, {useState, useEffect} from 'react'
import './style.css'

import Rooms from './Rooms'
import NavBarRoomList from './Navbar'

import Main from '../../Template/Main'
import Header from '../../Template/Header'
import Footer from '../../Template/Footer'

import {REGION_ROOMLIST} from '../../../redux/types'

import {useDebounce} from '../../../hooks/useDebounce';
import {useWindowSize} from '../../../hooks/useWindowSize';

const MAX_WIDTH = 600;//px

export default function RoomList(props) {
    console.log('Render RoomList (ENTRY POINT)')

    //уменьшение сайдбара, при ширене экрана менее MAX_WIDTH, с задержкой в 1сек
    const [isSmall, setIsSmall] = useState(false);
    const windowSize = useWindowSize();
    const debouncedIsSmall = useDebounce(windowSize.width && windowSize.width < MAX_WIDTH, 1000);
    useEffect( () => {
        setIsSmall(debouncedIsSmall)
    }, [debouncedIsSmall])

    const region = REGION_ROOMLIST;

    return (
        <div className={"flx sidebar-rooms" + ( isSmall ? ' small' : '' )}>
            <Header style={{background: '#D3D3D3'}}>
                <NavBarRoomList region={region} isSmall={isSmall} setIsSmall={setIsSmall}/>
            </Header>

            <Main region={region}>
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
