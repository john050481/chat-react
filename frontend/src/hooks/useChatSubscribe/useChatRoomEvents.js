import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useDispatch } from 'react-redux';
import {exitRoom} from '../../redux/actions';
import usePrevious from "../usePrevious";

function useChatRoomEventsSubscribe() {
    console.log('---useChatRoomEventsSubscribe---');

    const chatDb = useChat();
    const [newEvent, setNewEvent] = useState(null);

    //подписка на события с комнатой
    useEffect( () => {
        console.log('---useChatRoomEventsSubscribe---useEffect');
        function handlerRoom(eventObj) {
            console.log('---useChatRoomEventsSubscribe---handlerRoom', eventObj);
            setNewEvent(eventObj);
        }
        chatDb.addEventListener('room-enter', handlerRoom);
        chatDb.addEventListener('room-exit', handlerRoom);

        return () => {
            console.log('---useChatRoomEventsSubscribe---useEffect---unmount');
            chatDb.removeEventListener('room-enter', handlerRoom);
            chatDb.removeEventListener('room-exit', handlerRoom);
        }
    }, [chatDb.userId]);

    return newEvent;
}

export default function useChatRoomEvents() {
    console.log('---useChatRoomEvents---');

//    const chatDb = useChat();
    let newEvent = useChatRoomEventsSubscribe();
    let prevNewEvent = usePrevious(newEvent);

    const dispatch = useDispatch();
//    const { rooms, currentRoomId } = useSelector(store => ({
//        /*rooms: store.chat.rooms,*/
//        currentRoomId: store.chat.currentRoomId
//    }), shallowEqual);

    useEffect( () => {
        console.log('---useChatRoomEvents---useEffect');

        if (!newEvent || prevNewEvent === newEvent)
            return;

        if (newEvent.event === 'room-enter') {
            console.log('---useChatRoomEvents---useEffect---room-enter');
            //dispatch(exitRoom(newEvent.detail.roomId));
        }
        if (newEvent.event === 'room-exit') {
            console.log('---useChatRoomEvents---useEffect---room-exit');
            dispatch(exitRoom(newEvent.detail.roomId));
        }
        //dispatch(requestUpdateRoomMetadata(lastMessageEdit.roomId, () => chatDb.getRoomMetadata(lastMessageEdit.roomId)));

    }, [newEvent]);
}
