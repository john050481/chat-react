import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {addNewMessageInCurrentChat, modifyMessageInCurrentChat, removeMessageInCurrentChat, addNewMessageInOtherChat, requestUpdateRoomMetadata} from '../../redux/actions';
import usePrevious from '../usePrevious';

function useChatMessageSubscribe() {
    console.log('---useChatMessageSubscribe---');

    const chatDb = useChat();
    const [lastMessageEdit, setLastMessageEdit] = useState();

    // ADD/MODIFY/REMOVE (подписка на сообщения)
    useEffect( () => {
        console.log('---useChatMessageSubscribe---useEffect');
        function handlerEventMessage ({event, detail}) {
            let roomId = detail.path.split('/')[1];
            setLastMessageEdit({...detail, roomId, event});
            console.log('---useChatMessageSubscribe---handlerEventMessage, detail message ADD/MODIFY/REMOVE  === ', {...detail, roomId, event});
        }
        chatDb.addEventListener('message-add', handlerEventMessage);
        chatDb.addEventListener('message-modify', handlerEventMessage);
        chatDb.addEventListener('message-remove', handlerEventMessage);

        return () => {
            console.log('---useChatMessageSubscribe---useEffect---unmount');
            chatDb.removeEventListener('message-add', handlerEventMessage);
            chatDb.removeEventListener('message-modify', handlerEventMessage);
            chatDb.removeEventListener('message-remove', handlerEventMessage);
        }
    }, [chatDb.userId]);

    return lastMessageEdit;
}

export default function useChatMessageEvents() {
    console.log('---useChatMessageEvents---');

    const chatDb = useChat();
    let lastMessageEdit = useChatMessageSubscribe();
    let prevLastMessageEdit = usePrevious(lastMessageEdit);

    const dispatch = useDispatch();
    const { /*rooms,*/ currentRoomId } = useSelector(store => ({
        /*rooms: store.chat.rooms,*/
        currentRoomId: store.chat.currentRoomId
    }), shallowEqual);

    useEffect( () => {
        console.log('---useChatMessageEvents---useEffect');

        if (!lastMessageEdit || prevLastMessageEdit === lastMessageEdit)
            return;

        if (currentRoomId && currentRoomId === lastMessageEdit.roomId) {
            // сообщение пришло в активную комнату
            if (lastMessageEdit.event === 'message-add') {
                dispatch(addNewMessageInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'message-modify') {
                dispatch(modifyMessageInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'message-remove') {
                dispatch(removeMessageInCurrentChat(lastMessageEdit.message));
            }
        } else {
            // сообщение пришло в НЕ активную комнату
            if (lastMessageEdit.event === 'message-add') {
                dispatch(addNewMessageInOtherChat(lastMessageEdit.roomId));
            } else if (lastMessageEdit.event === 'message-modify') {
            } else if (lastMessageEdit.event === 'message-remove') {
            }
        }
        dispatch(requestUpdateRoomMetadata(lastMessageEdit.roomId, () => chatDb.getRoomMetadata(lastMessageEdit.roomId)));

    }, [/*rooms,*/ currentRoomId, lastMessageEdit]);

    return lastMessageEdit;
}
