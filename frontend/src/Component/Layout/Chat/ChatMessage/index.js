import './style.css';
import React from 'react';
import Toast from 'react-bootstrap/Toast'

export default function ChatMessage(props) {
    const {message, citation, owner} = props;
    return (
        <Toast className={'chat-message' + (owner ? ' notMy' : ' my')}>
            {
                owner &&
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{owner}</strong>
                    <small className='ml-3'>2020-04-25</small>
                </Toast.Header>
            }
            <Toast.Body>
                {
                    citation &&
                    <>
                        <small>{citation}</small>
                        <hr />
                    </>
                }
                <p data-message={true}>{message.body}</p>
            </Toast.Body>
            <small className='chat-message--time'>11 mins ago</small>
        </Toast>
    )
}