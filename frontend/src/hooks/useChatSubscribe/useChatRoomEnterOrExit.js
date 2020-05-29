import React, { useState, useEffect } from 'react';
import {useChat} from "../useChatFirebase";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { exitRoom } from '../../redux/actions';

export default function useChatRoomEnterOrExit() {
    console.log('---useChatRoomEnterOrExit---');

    const chatDb = useChat();
    const [newEvent, setNewEvent] = useState(null);

    const dispatch = useDispatch();
    const { rooms, currentRoomId } = useSelector(store => ({
        rooms: store.chat.rooms,
        currentRoomId: store.chat.currentRoomId
    }), shallowEqual);

    //подписка на события с комнатой
    useEffect( () => {
        console.log('---useChatRoomEnterOrExit---useEffect');

        function handlerRoomEnter(eventObj) {
            console.log('---useChatRoomEnterOrExit---room---enter', eventObj);
            setNewEvent(eventObj);
        }
        function handlerRoomExit(eventObj) {
            console.log('---useChatRoomEnterOrExit---room---exit', eventObj);
            setNewEvent(eventObj);
            dispatch(exitRoom(currentRoomId));
        }
        chatDb.addEventListener('room-enter', handlerRoomEnter);
        chatDb.addEventListener('room-exit', handlerRoomExit);

        return () => {
            console.log('---useChatRoomEnterOrExit---useEffect---unmount');
            chatDb.removeEventListener('room-enter', handlerRoomEnter);
            chatDb.removeEventListener('room-exit', handlerRoomExit);
        }
    }, [rooms, currentRoomId]);

    return newEvent;
}
