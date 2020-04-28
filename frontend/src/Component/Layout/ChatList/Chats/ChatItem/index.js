import './style.css'
import React from 'react'
import Card from "react-bootstrap/Card";
import Loader from "../../../../Loader";
import {FaUserCircle} from "react-icons/fa";
import {connect} from "react-redux";

function ChatItem({chat, isSmall, requestChatId, loader, chatInfo}) {
    const chatId = chatInfo ? chatInfo.id : null;

    return (
        <div data-chatid={chat.id}>
            <Card className={ 'chat' + (chatId === chat.id ? ' active' : '') }>
                {/*<Card.Header>Quote</Card.Header>*/}
                <Card.Body className='pl-2'>
                    <blockquote className="blockquote mb-0">
                        <div className='chat-header'>
                            {loader && requestChatId === chat.id
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
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chatInfo: store.chat.chatInfo,
        loader: store.app.loader.visible,
        requestChatId: store.chat.requestChatId
    }
}

export default connect(mapStateToProps, null)(ChatItem)