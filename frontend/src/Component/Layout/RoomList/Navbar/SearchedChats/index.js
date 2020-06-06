import './style.css'
import React, {useEffect, useState} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import {connect} from "react-redux";
import {requestRoomIdMessages} from "../../../../../redux/actions";
import {useChat} from "../../../../../hooks/useChatFirebase";

function SearchedChats(props) {

    const chatDb = useChat();

    const [seachedChat, setSearchedChat] = useState([]);

    useEffect( () => {
        if (!props.searchValue)
            return setSearchedChat([]);

        if (Array.isArray(props.rooms)) {
            const searchString = props.searchValue.toLowerCase().trim();
            const arr = props.rooms.filter( item => item.data.name.toLowerCase().indexOf(searchString) !== -1 );
            setSearchedChat(arr);
            console.log('arr ===', arr);
        }
        console.log('searchValue ===', props.searchValue);
    }, [props.searchValue])

    function handlerClick(e) {
        const roomId = e.target.dataset.id;
        console.log('e.target.dataset.id (roomId) = ', roomId);

        //прокручиваем элемент, если он не виден
        let curElemRoomId = document.querySelector(`[data-roomid=\"${roomId}\"]`);
        if (curElemRoomId)
            curElemRoomId.scrollIntoView(); /* elemInWindow(curElemRoomId, null, target => target.scrollIntoView() ); */

        props.requestRoomIdMessages( roomId, chatDb );
        props.setIsShowSearchedChat(false);
    }

    return (
        <ListGroup className='searched-result'>
            {
                (seachedChat.length && props.searchValue)
                ? seachedChat.map( item =>
                      <ListGroup.Item
                          key={item.roomId}
                          className='searched-result--item'
                          data-id={item.roomId}
                          onClick={handlerClick}
                      >
                          {item.data.name}
                      </ListGroup.Item>
                  )
                : <ListGroup.Item>Enter search string</ListGroup.Item>
            }
        </ListGroup>
    )
}

const mapStateToProps = store => {
    return {
        rooms: store.chat.rooms
    }
}
const mapDispatchToProps = {
    requestRoomIdMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedChats)