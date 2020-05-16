import React, { useState, useEffect } from 'react';
import {useChat} from "../../../hooks/useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {addNewMessageInCurrentChat, requestUpdateRoomMetadata} from '../../../redux/actions';

export default function useChatMessages() {
    console.log('---useChatMessages---');

    const [newMessage, setNewMessage] = useState(null);
    const chatDb = useChat();

    const dispatch = useDispatch();
    const { rooms, currentRoomId } = useSelector(state => ({
        rooms: state.chat.rooms,
        currentRoomId: state.chat.currentRoomId
    }), shallowEqual);

    //подписка на новые сообщения
    useEffect( () => {
        function handlerEventMessageAdd ({detail}) {
            const roomId = detail.path.split('/')[1];
            setNewMessage({...detail, roomId});
            console.log('---useChatMessages---, detail message ADD  === ', {...detail, roomId});
            const message = {...detail.message, id: detail.id};
            if (currentRoomId && roomId === currentRoomId) {
                //новое сообщение пришло в активную комнату
                dispatch(addNewMessageInCurrentChat(message));
            } else {
                //новое сообщение пришло в НЕ активную комнату
            }
            dispatch(requestUpdateRoomMetadata(roomId, () => chatDb.getRoomMetadata(roomId)));
        }
        chatDb.addEventListener('message-add', handlerEventMessageAdd);

        return () => chatDb.removeEventListener('message-add', handlerEventMessageAdd);
    }, [rooms, currentRoomId]);

    return newMessage;
}
