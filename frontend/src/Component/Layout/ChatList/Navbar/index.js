import React, {useRef, useState} from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import './style.css'
import {requestChats, showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {FaCog, FaRedo, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Settings from '../../../Settings';
import SearchedChats from './SearchedChats'
import {useOnClickOutside} from "../../../../hooks/useOnClickOutside";

function NavBarSidebar(props) {
    console.log('Render NavBarSidebar');

    const [isShowSearchedChat, setIsShowSearchedChat] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, (e)=>setIsShowSearchedChat(false));

    const [searchValue, setSearchValue] = useState('');

    function handleClickSettings(e) {
        props.setRender( (prev) => () => <Settings /> );
        props.showLayout({region: props.region});
    }

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
                    placeholder="search contact"
                    aria-label="search contact"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append hidden={props.isSmall}>
                    <Button
                        variant="outline-dark"
                        data-component='Settings'
                        title="settings"
                        size="sm"
                        onClick={handleClickSettings}
                    >
                        <FaCog />
                    </Button>
                    <Button
                        variant="outline-dark"
                        data-component='Refresh'
                        title="Refresh chat/contact list"
                        size="sm"
                        onClick={(e)=>{props.requestChats()}}
                    >
                        <FaRedo />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            {isShowSearchedChat
                ? <div className='searched-contact'>
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
    }
}
const mapDispatchToProps = {
    showLayout,
    requestChats
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSidebar)