import React from "react";
import './style.css';
import Card from "react-bootstrap/Card";
import {FaUserCircle} from "react-icons/fa";
import {connect} from "react-redux";
import {requestChat} from "../../../../redux/actions";
import Loader from '../../../Loader';
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

function Chats({chats, isSmall, requestChat, chatId, loader}) {

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
                  <div data-chatid={chat.id} key={chat.id}>
                      <Card className={ 'chat' + (chatId === chat.id ? ' active' : '') }>
                          {/*<Card.Header>Quote</Card.Header>*/}
                          <Card.Body className='pl-2'>
                              <blockquote className="blockquote mb-0">
                                  <div className='chat-header'>
                                      {loader && chatId === chat.id
                                          ? <Loader />
                                          : <FaUserCircle title={chat.name} className='mr-2' size='2em'/>
                                      }

                                      <span className={'chat__name'} hidden={isSmall}>
                                        {chat.name}
                                      </span>
                                  </div>
                                  <footer className="blockquote-footer" hidden={isSmall}>
                                      {chat.phone}
                                  </footer>
                              </blockquote>
                          </Card.Body>
                      </Card>
                  </div>)
            }
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chatId: store.chat.chatId,
        loader: store.app.loader.visible
    }
}
const mapDispatchToProps = {
    requestChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)