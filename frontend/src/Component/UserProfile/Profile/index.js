import React from 'react';
import DB from ".././_db";
import {useChatFirebase} from "../../../hooks/useChatFirebase";

export default function (props) {
    const chatDb = useChatFirebase();

    async function handlerGetInfo(e) {
        console.log(chatDb, await chatDb.getUserData(chatDb.userId));
    }//*********
    function handlerCreate(e) {
        chatDb.createUser('example@example.ru', 'example@example.ru', console.log)
            .then( res => console.log('Создан пользователь = ', res))
            .catch( e => console.log(e));
    }//*********
    function handlerUpdate(e) {
        chatDb.updateUser( chatDb.userId,{ name: 'name', address: {city: 'blg'} }, console.log )
            .then( () => console.log('Обновлен пользователь'))
            .catch( e => console.log(e));
    }//*********
    function handlerDelete(e) {
        chatDb.deleteUser(chatDb.userId, console.log)
            .then( () => console.log('Удален пользователь'))
            .catch( e => console.log(e));
    }//*********
    async function handlergetGetRoomMessages(e) {
        let messages = await chatDb.getRoomMessages('room1');
        console.log(messages);
    }//*********
    async function handlercreateRoom(e) {
        const result = chatDb.createRoom('roomCreate', 'private', console.log);
        console.log('result = ', await result);
    }//*********
    function handlergetRoom(e) {
        chatDb.getRoom('room1', console.log);
    }//*********
    async function handlerDeleteChatFromUserProfile(e) {
        let userData = await chatDb.getUserData(chatDb.user);
        chatDb.deleteChatFromUserProfile(userData.chats[2]);
    }
    async function handlerUpdateRoom(e) {
        chatDb.updateRoom('room1', 'new name room #1', 'public', console.log)
        .then( () => console.log('Room обновлена!'))
        .catch( e => console.log(e))
    }//*********
    async function handlerDeleteRoom(e) {
        chatDb.deleteRoom('JI5A3fqPTNkYNbfIobYG', console.log);
    }//!!!!!!!!! ПРОБЛЕМА, см. "useChatFirebase"

    return (
        <div>
            Profile
            <DB />{/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
            <hr />
            <button onClick={handlerGetInfo} className={'btn btn-outline-success'}>get info</button>
            <button onClick={handlerCreate} className={'btn btn-outline-success'}>create user</button>
            <button onClick={handlerUpdate} className={'btn btn-outline-success'}>updete user</button>
            <button onClick={handlerDelete} className={'btn btn-outline-success'}>delete user</button>
            <hr />
            <button onClick={handlergetGetRoomMessages} className={'btn btn-outline-success'}>get room messages</button>
            <button onClick={handlercreateRoom} className={'btn btn-outline-success'}>create room</button>
            <button onClick={handlergetRoom} className={'btn btn-outline-success'}>get metadata room</button>
            <button onClick={handlerDeleteChatFromUserProfile}>delete chat from user profile</button>
            <button onClick={handlerUpdateRoom} className={'btn btn-outline-success'}>update room</button>
            <button onClick={handlerDeleteRoom} className={'btn btn-outline-danger'}>delete room</button>
        </div>
    )
}