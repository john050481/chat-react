import React, { useState, useEffect } from 'react';
import {useChat} from "../../../hooks/useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

export default function useChatRooms() {
    console.log('---useChatRooms---');

    const [newEvent, setNewEvent] = useState(null);
    const chatDb = useChat();

    const dispatch = useDispatch();
    const { rooms, currentRoomId } = useSelector(state => ({
        rooms: state.chat.rooms,
        currentRoomId: state.chat.currentRoomId
    }), shallowEqual);

    //подписка на события с комнатой
    useEffect( () => {
        function handlerRoomEnter(eventObj) {
            console.log('---useChatRooms---room---enter', eventObj);
            setNewEvent(eventObj);
        }
        function handlerRoomExit(eventObj) {
            console.log('---useChatRooms---room---exit', eventObj);
            setNewEvent(eventObj);
        }
        chatDb.addEventListener('room-enter', handlerRoomEnter);
        chatDb.addEventListener('room-exit', handlerRoomExit);

        return () => {
            chatDb.removeEventListener('room-enter', handlerRoomEnter);
            chatDb.removeEventListener('room-exit', handlerRoomExit);
        }
    }, [rooms, currentRoomId]);

    return newEvent;
}
