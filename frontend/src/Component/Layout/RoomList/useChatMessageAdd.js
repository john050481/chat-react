import React, { useState, useEffect } from 'react';
import {useChat} from "../../../hooks/useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {addNewMessageInCurrentChat, modifyMessageInCurrentChat, requestUpdateRoomMetadata} from '../../../redux/actions';

export default function useChatMessageAdd() {
    console.log('---useChatMessageAdd---');

    const chatDb = useChat();
    const [newMessage, setNewMessage] = useState(null);

    const dispatch = useDispatch();
    const { rooms, currentRoomId } = useSelector(store => ({
        rooms: store.chat.rooms,
        currentRoomId: store.chat.currentRoomId
    }), shallowEqual);

    //подписка на новые сообщения
    useEffect( () => {
        function handlerEventMessageAdd ({detail}) {
            const roomId = detail.path.split('/')[1];
            setNewMessage({...detail, roomId});
            console.log('---useChatMessageAdd---, detail message ADD  === ', {...detail, roomId});
            const message = {...detail.message, id: detail.id};
            if (currentRoomId && roomId === currentRoomId) {
                //новое сообщение пришло в активную комнату
                dispatch(addNewMessageInCurrentChat(message));
            } else {
                // новое сообщение пришло в НЕ активную комнату
                // использовать rooms
            }
            dispatch(requestUpdateRoomMetadata(roomId, () => chatDb.getRoomMetadata(roomId)));
        }
        chatDb.addEventListener('message-add', handlerEventMessageAdd);

        return () => chatDb.removeEventListener('message-add', handlerEventMessageAdd);
    }, [rooms, currentRoomId]);

    //подписка на измененные сообщения
    useEffect( () => {
        function handlerEventMessageModify ({detail}) {
            const roomId = detail.path.split('/')[1];
            setNewMessage({...detail, roomId});
            console.log('---useChatMessageModify---, detail message MODIFY  === ', {...detail, roomId});
            const message = {...detail.message, id: detail.id};
            if (currentRoomId && roomId === currentRoomId) {
                //изменение в сообщении пришло в активную комнату
                dispatch(modifyMessageInCurrentChat(message));
            } else {
                // изменение в сообщении пришло в НЕ активную комнату
                // использовать rooms
            }
            //dispatch(requestUpdateRoomMetadata(roomId, () => chatDb.getRoomMetadata(roomId)));
        }
        chatDb.addEventListener('message-modify', handlerEventMessageModify);

        return () => chatDb.removeEventListener('message-modify', handlerEventMessageModify);
    }, [rooms, currentRoomId]);

    //подписка на удаленные сообщения
    useEffect( () => {
        function handlerEventMessageRemove ({detail}) {
            const roomId = detail.path.split('/')[1];
            console.log('---useChatMessageRemove---, detail message REMOVE  === ', {...detail, roomId});
        }
        chatDb.addEventListener('message-remove', handlerEventMessageRemove);

        return () => chatDb.removeEventListener('message-remove', handlerEventMessageRemove);
    }, [rooms, currentRoomId]);

    return newMessage;
}
