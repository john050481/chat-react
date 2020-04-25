import React from "react";
import './style.css';
import {connect} from "react-redux";
import {requestChat} from "../../../../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import ChatItem from './ChatItem';

function Chats({isSmall, chats, chatId, requestChat}) {

    function handleClick(e) {
        let curElemChatId = e.target.closest('[data-chatid]');
        if (curElemChatId) {
            let id = +curElemChatId.dataset.chatid;
            if (id !== chatId) {
                requestChat(id);
            }
        }
    }

    return (
        <div className='chats' onClick={handleClick}>
            {   (!chats.length)
                ? <Container className='App-spinner-container'>
                    <Spinner className='App-spinner' animation="grow" variant="info" />
                  </Container>
                : chats.map(chat =>
                    <ChatItem key={chat.id} chat={chat} isSmall={isSmall} />
                  )
            }
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chatId: store.chat.chatId,
        chats: store.chat.chats
    }
}

const mapDispatchToProps = {
    requestChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)