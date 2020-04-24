import './style.css'
import React from 'react'
import Card from "react-bootstrap/Card";
import Loader from "../../../../Loader";
import {FaUserCircle} from "react-icons/fa";
import {connect} from "react-redux";

function ChatItem(props) {
    const {chat, isSmall, loader, chatId} = props;

    return (
        <div data-chatid={chat.id}>
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
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chatId: store.chat.chatId,
        loader: store.app.loader.visible
    }
}

export default connect(mapStateToProps, null)(ChatItem)