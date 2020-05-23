import React, {useEffect, useRef, useState} from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import './style.css'
import {requestUserRoomsMetadata, showLayout, requestUserContacts} from "../../../../redux/actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {FaRedo, FaArrowLeft, FaArrowRight, FaPlus} from "react-icons/fa";
import SearchedChats from './SearchedChats'
import CreateRoom from '../CreateRoom';
import {useOnClickOutside} from "../../../../hooks/useOnClickOutside";
import {useChat} from "../../../../hooks/useChatFirebase";
import UserProfile from "../../../UserProfile";
import FakeSearchMessage from "../../../FakeComponent/FakeSearchMessage";
import FakeSettings from "../../../FakeComponent/FakeSettings";
import AuthForm from "../../../AuthForm";
import About from "../../../About";
import useLayout from "../../useLayout";

function NavBarSidebar(props) {
    console.log('Render NavBarSidebar');

    const chatDb = useChat();

    const [isShowSearchedChat, setIsShowSearchedChat] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, (e)=>setIsShowSearchedChat(false));

    const [searchValue, setSearchValue] = useState('');

    /*LAYOUT*/
    const components = {
        CreateRoom: <CreateRoom />
    }
    const handleClick = useLayout({components, setRender: props.setRender, region: props.region});
    /*LAYOUT*/

    return (
        <div className="navbarsidebar-block" ref={ref}>
            <InputGroup className="pl-3 pr-3 search-contact">
                <InputGroup.Prepend>
                    <Button
                        variant="outline-secondary"
                        title="hide leftbar"
                        size="sm"
                        onClick={()=>{props.setIsSmall(!props.isSmall)}}
                    >
                        {props.isSmall ? <FaArrowRight /> : <FaArrowLeft /> }
                    </Button>
                </InputGroup.Prepend>
                <FormControl
                    hidden={props.isSmall}
                    type="search"
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    onFocus={()=>setIsShowSearchedChat(true)}
                    placeholder="search chats"
                    aria-label="search chats"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append hidden={props.isSmall}>
                    <Button
                        variant="outline-dark"
                        data-component='Refresh'
                        title="Refresh room/contact list"
                        size="sm"
                        onClick={(e)=>{
                            props.requestUserRoomsMetadata( () => chatDb.getUserRoomsMetadata() );
                            props.requestUserContacts( () => chatDb.getUserContacts() );
                        }}
                    >
                        <FaRedo />
                    </Button>
                    <Button
                        variant="outline-dark"
                        data-component='FakeSearchMessage'
                        data-component='CreateRoom'
                        title="Add new chat"
                        size="sm"
                        onClick={handleClick}
                    >
                        <FaPlus />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            {isShowSearchedChat
                ? <div className='searched-contact' hidden={props.isSmall}>
                    <div className='searched-contact--wrapper'>
                        <SearchedChats
                            searchValue={searchValue}
                            setIsShowSearchedChat={setIsShowSearchedChat}
                        />
                    </div>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = store => {
    return {
        layout: store.app.layout
    }
}
const mapDispatchToProps = {
    showLayout,
    requestUserRoomsMetadata,
    requestUserContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSidebar)