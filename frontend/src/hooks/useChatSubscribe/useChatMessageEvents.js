import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {addNewMessageInCurrentChat, modifyMessageInCurrentChat, removeMessageInCurrentChat, addNewMessageInOtherChat, requestUpdateRoomMetadata} from '../../redux/actions';
import usePrevious from '../usePrevious';

function useChatMessageEventsSubscribe() {
    console.log('---useChatMessageEventsSubscribe---');

    const chatDb = useChat();
    const [lastMessageEdit, setLastMessageEdit] = useState();

    // ADD/MODIFY/REMOVE (подписка на сообщения)
    useEffect( () => {
        console.log('---useChatMessageEventsSubscribe---useEffect');
        function handlerEventStatusMessage({event, detail}) {
            console.log(event, detail);
        }
        function handlerEventMessage ({event, detail}) {
            let roomId = detail.path.split('/')[1];
            setLastMessageEdit({...detail, roomId, event});
            console.log('---useChatMessageEventsSubscribe---handlerEventMessage, detail message ADD/MODIFY/REMOVE  === ', {...detail, roomId, event});
        }
        chatDb.addEventListener('messages-added', handlerEventMessage);
        chatDb.addEventListener('messages-modified', handlerEventMessage);
        chatDb.addEventListener('messages-removed', handlerEventMessage);
        chatDb.addEventListener('statuses-modified', handlerEventStatusMessage);

        return () => {
            console.log('---useChatMessageEventsSubscribe---useEffect---unmount');
            chatDb.removeEventListener('messages-added', handlerEventMessage);
            chatDb.removeEventListener('messages-modified', handlerEventMessage);
            chatDb.removeEventListener('messages-removed', handlerEventMessage);
            chatDb.removeEventListener('statuses-modified', handlerEventStatusMessage);
        }
    }, [chatDb.userId]);

    return lastMessageEdit;
}

export default function useChatMessageEvents() {
    console.log('---useChatMessageEvents---');

    const chatDb = useChat();
    let lastMessageEdit = useChatMessageEventsSubscribe();
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
            if (lastMessageEdit.event === 'messages-added') {
                dispatch(addNewMessageInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'messages-modified') {
                dispatch(modifyMessageInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'messages-removed') {
                dispatch(removeMessageInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'statuses-added') {
                console.log('statuses-added');
            } else if (lastMessageEdit.event === 'statuses-modified') {
                console.log('statuses-modified');
            } else if (lastMessageEdit.event === 'statuses-removed') {
                console.log('statuses-removed');
            }
        } else {
            // сообщение пришло в НЕ активную комнату
            if (lastMessageEdit.event === 'messages-added') {
                dispatch(addNewMessageInOtherChat(lastMessageEdit.roomId));
            } else if (lastMessageEdit.event === 'messages-modified') {
            } else if (lastMessageEdit.event === 'messages-removed') {
            } else if (lastMessageEdit.event === 'statuses-added') {
            } else if (lastMessageEdit.event === 'statuses-modified') {
            } else if (lastMessageEdit.event === 'statuses-removed') {
            }
        }
        dispatch(requestUpdateRoomMetadata(lastMessageEdit.roomId, () => chatDb.getRoomMetadata(lastMessageEdit.roomId)));

    }, [/*rooms,*/ currentRoomId, lastMessageEdit]);

    return lastMessageEdit;
}
