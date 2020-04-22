import './style.css'
import React, {useEffect, useState} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import {connect} from "react-redux";
import {requestChat} from "../../../../../redux/actions";

function SearchedChats(props) {

    const [seachedChat, setSearchedChat] = useState([]);

    useEffect( () => {
        if (!props.searchValue)
            return setSearchedChat([]);

        if (Array.isArray(props.chats)) {
            const searchString = props.searchValue.toLowerCase().trim();
            const arr = props.chats.filter( item => item.name.toLowerCase().indexOf(searchString) !== -1 );
            setSearchedChat(arr);
            console.log('arr ===', arr);
        }
        console.log('searchValue ===', props.searchValue);
    }, [props.searchValue])

    function handlerClick(e) {
        console.log('e.target.dataset.id = ', e.target.dataset.id);
        props.requestChat(+e.target.dataset.id);
        props.setIsShowSearchedChat(false);
    }

    return (
        <ListGroup className='searched-result'>
            {
                (seachedChat.length && props.searchValue)
                ? seachedChat.map( item =>
                      <ListGroup.Item
                          key={item.id}
                          className='searched-result--item'
                          data-id={item.id}
                          onClick={handlerClick}
                      >
                          {item.name}
                      </ListGroup.Item>
                  )
                : <ListGroup.Item>Enter search string</ListGroup.Item>
            }
        </ListGroup>
    )
}

const mapStateToProps = store => {
    return {
        chats: store.chat.chats
    }
}
const mapDispatchToProps = {
    requestChat
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedChats)