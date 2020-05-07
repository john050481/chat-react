import React from 'react';
import DB from ".././_db";
import {useChatFirebase} from "../../../hooks/useChatFirebase";

export default function (props) {
    const chatDb = useChatFirebase();
    const roomIdElem = document.getElementById('roomIdElem');
    const userIdElem = document.getElementById('userIdElem');

    async function handlerGetInfo(e) {
        console.log(chatDb, await chatDb.getUserData(userIdElem.value ? userIdElem.value : chatDb.userId));
    }//*********
    function handlerCreate(e) {
        chatDb.createUser(userIdElem.value ? userIdElem.value : 'example@example.ru', 'example@example.ru', console.log)
            .then( res => console.log(`Создан пользователь = ${userIdElem.value ? userIdElem.value : 'example@example.ru'}`, res))
            .catch( e => console.log(e));
    }//*********
    function handlerUpdate(e) {
        chatDb.updateUser( userIdElem.value ? userIdElem.value : chatDb.userId,{ name: 'name', address: {city: 'blg'} }, console.log )
            .then( () => console.log(`Обновлен пользователь ${userIdElem.value ? userIdElem.value : chatDb.userId}`))
            .catch( e => console.log(e));
    }//*********
    function handlerDelete(e) {
        chatDb.deleteUser(userIdElem.value ? userIdElem.value : chatDb.userId, console.log)
            .then( () => console.log(`Удален пользователь ${userIdElem.value ? userIdElem.value : chatDb.userId}`))
            .catch( e => console.log(e));
    }//*********
    async function handlergetGetRoomMessages(e) {
        let messages = await chatDb.getRoomMessages(roomIdElem.value);
        console.log(messages);
    }//*********
    async function handlercreateRoom(e) {
        const result = chatDb.createRoom('roomCreate', 'private', console.log);
        console.log('result = ', await result);
    }//*********
    function handlergetRoomMetadata(e) {
        chatDb.getRoomMetadata(roomIdElem.value, console.log);
    }//*********
    function handlerenterRoom(e) {
        chatDb.enterRoom(roomIdElem.value).then( () => console.log(`Enterd ${roomIdElem.value}`) );
    }//*********
    function handlerleaveRoom(e) {
        chatDb.leaveRoom(roomIdElem.value).then( () => console.log(`Deleted ${roomIdElem.value}!!`) );
    }//*********
    async function handlerupdateRoomMetadata(e) {
        chatDb.updateRoomMetadata(roomIdElem.value, `new name room`, 'public', console.log)
        .then( () => console.log('Room обновлена!'))
        .catch( e => console.log(e))
    }//*********
    async function handlerDeleteRoom(e) {
        chatDb.deleteRoom(roomIdElem.value, console.log);
    }//!!!!!!!!! ПРОБЛЕМА, см. "useChatFirebase"

    return (
        <div>
            Profile
            <DB />{/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
            <hr />
            <label>user id: <input id={'userIdElem'} /></label>
            <br />
            <button onClick={handlerGetInfo} className={'btn btn-outline-success'}>get info</button>
            <button onClick={handlerCreate} className={'btn btn-outline-success'}>create user</button>
            <button onClick={handlerUpdate} className={'btn btn-outline-success'}>updete user</button>
            <button onClick={handlerDelete} className={'btn btn-outline-success'}>delete user</button>
            <hr />
            <label>room id: <input id={'roomIdElem'} /></label>
            <br />
            <button onClick={handlergetGetRoomMessages} className={'btn btn-outline-success'}>get room messages</button>
            <br/>
            <button onClick={handlergetRoomMetadata} className={'btn btn-outline-success'}>get metadata room</button>
            <button onClick={handlerupdateRoomMetadata} className={'btn btn-outline-success'}>update room metadata</button>
            <br/>
            <button onClick={handlercreateRoom} className={'btn btn-outline-success'}>create room</button>
            <button onClick={handlerDeleteRoom} className={'btn btn-outline-danger'}>delete room</button>
            <br/>
            <button onClick={handlerenterRoom} className={'btn btn-outline-success'}>enter room</button>
            <button onClick={handlerleaveRoom} className={'btn btn-outline-success'}>leave room</button>
        </div>
    )
}