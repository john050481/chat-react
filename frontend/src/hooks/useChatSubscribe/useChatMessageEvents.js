import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {requestUpdateRoomMetadata} from '../../redux/actions';
import {addNewMessageInCurrentChat, modifyMessageInCurrentChat, removeMessageInCurrentChat, addNewMessageInOtherChat} from '../../redux/actions/messagesActions';
import {addNewMessageStatusInCurrentChat, modifyMessageStatusInCurrentChat, removeMessageStatusInCurrentChat, addNewMessageStatusInOtherChat} from '../../redux/actions/statusesActions';
import usePrevious from '../usePrevious';

function useChatMessageEventsSubscribe() {
    console.log('---useChatMessageEventsSubscribe---');

    const chatDb = useChat();
    const [lastMessageEdit, setLastMessageEdit] = useState();

    // ADD/MODIFY/REMOVE (подписка на сообщения)
    useEffect( () => {
        console.log('---useChatMessageEventsSubscribe---useEffect');
        function handlerEvent ({event, detail}) {
            let roomId = detail.path.split('/')[1];
            setLastMessageEdit({...detail, roomId, event});
            console.log('---useChatMessageEventsSubscribe---handlerEventMessage, detail message ADD/MODIFY/REMOVE  === ', {...detail, roomId, event});
        }
        chatDb.addEventListener('messages-added', handlerEvent);
        chatDb.addEventListener('messages-modified', handlerEvent);
        chatDb.addEventListener('messages-removed', handlerEvent);
        chatDb.addEventListener('statuses-added', handlerEvent);
        chatDb.addEventListener('statuses-modified', handlerEvent);
        chatDb.addEventListener('statuses-removed', handlerEvent);

        return () => {
            console.log('---useChatMessageEventsSubscribe---useEffect---unmount');
            chatDb.removeEventListener('messages-added', handlerEvent);
            chatDb.removeEventListener('messages-modified', handlerEvent);
            chatDb.removeEventListener('messages-removed', handlerEvent);
            chatDb.removeEventListener('statuses-added', handlerEvent);
            chatDb.removeEventListener('statuses-modified', handlerEvent);
            chatDb.removeEventListener('statuses-removed', handlerEvent);
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
                dispatch(addNewMessageStatusInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'statuses-modified') {
                dispatch(modifyMessageStatusInCurrentChat(lastMessageEdit.message));
            } else if (lastMessageEdit.event === 'statuses-removed') {
                dispatch(removeMessageStatusInCurrentChat(lastMessageEdit.message));
            }
        } else {
            // сообщение пришло в НЕ активную комнату
            if (lastMessageEdit.event === 'messages-added') {
                dispatch(addNewMessageInOtherChat(lastMessageEdit.roomId));
            } else if (lastMessageEdit.event === 'messages-modified') {
            } else if (lastMessageEdit.event === 'messages-removed') {
            } else if (lastMessageEdit.event === 'statuses-added') {
                dispatch(addNewMessageStatusInOtherChat(lastMessageEdit.roomId));
            } else if (lastMessageEdit.event === 'statuses-modified') {
            } else if (lastMessageEdit.event === 'statuses-removed') {
            }
        }
        dispatch(requestUpdateRoomMetadata(lastMessageEdit.roomId, () => chatDb.getRoomMetadata(lastMessageEdit.roomId)));

    }, [/*rooms,*/ currentRoomId, lastMessageEdit]);

    return lastMessageEdit;
}
