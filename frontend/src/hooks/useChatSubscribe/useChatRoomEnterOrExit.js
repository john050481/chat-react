import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
    addNewMessageInCurrentChat, addNewMessageInOtherChat,
    exitRoom,
    modifyMessageInCurrentChat,
    removeMessageInCurrentChat, requestUpdateRoomMetadata
} from '../../redux/actions';
import usePrevious from "../usePrevious";

function useChatRoomEnterOrExitSubscribe() {
    console.log('---useChatRoomEnterOrExitSubscribe---');

    const chatDb = useChat();
    const [newEvent, setNewEvent] = useState(null);

    //подписка на события с комнатой
    useEffect( () => {
        console.log('---useChatRoomEnterOrExitSubscribe---useEffect');
        function handlerRoom(eventObj) {
            console.log('---useChatRoomEnterOrExitSubscribe---handlerRoom', eventObj);
            setNewEvent(eventObj);
        }
        chatDb.addEventListener('room-enter', handlerRoom);
        chatDb.addEventListener('room-exit', handlerRoom);

        return () => {
            console.log('---useChatRoomEnterOrExitSubscribe---useEffect---unmount');
            chatDb.removeEventListener('room-enter', handlerRoom);
            chatDb.removeEventListener('room-exit', handlerRoom);
        }
    }, [chatDb.userId]);

    return newEvent;
}

export default function useChatRoomEnterOrExit() {
    console.log('---useChatRoomEnterOrExit---');

//    const chatDb = useChat();
    let newEvent = useChatRoomEnterOrExitSubscribe();
    let prevNewEvent = usePrevious(newEvent);

    const dispatch = useDispatch();
//    const { rooms, currentRoomId } = useSelector(store => ({
//        /*rooms: store.chat.rooms,*/
//        currentRoomId: store.chat.currentRoomId
//    }), shallowEqual);

    useEffect( () => {
        console.log('---useChatRoomEnterOrExit---useEffect');

        if (!newEvent || prevNewEvent === newEvent)
            return;

        if (newEvent.event === 'room-enter') {
            console.log('---useChatRoomEnterOrExit---useEffect---room-enter');
            //dispatch(exitRoom(newEvent.detail.roomId));
        }
        if (newEvent.event === 'room-exit') {
            console.log('---useChatRoomEnterOrExit---useEffect---room-exit');
            dispatch(exitRoom(newEvent.detail.roomId));
        }
        //dispatch(requestUpdateRoomMetadata(lastMessageEdit.roomId, () => chatDb.getRoomMetadata(lastMessageEdit.roomId)));

    }, [newEvent]);
}
