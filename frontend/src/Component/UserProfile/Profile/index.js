import React from 'react';
import {useChatFirebase} from "../../../hooks/useChatFirebase";

export default function (props) {
    const chatDb = useChatFirebase();
    const roomIdElem = document.getElementById('roomIdElem');
    const userIdElem = document.getElementById('userIdElem');
    const messageIdElem = document.getElementById('messageIdElem');
    const messageElem = document.getElementById('messageElem');
    const eventNameElem = document.getElementById('eventNameElem');
    const userEmailElem = document.getElementById('userEmailElem');
    const noop = (event) => console.log(event);

    async function handlerGetInfo(e) {
        console.log(chatDb, await chatDb.getUserData(userIdElem.value ? userIdElem.value : chatDb.userId));
    }//*********
    function handlerCreate(e) {
        chatDb._createUser(userIdElem.value ? userIdElem.value : 'example@example.ru', 'example@example.ru', console.log)
            .then( res => console.log(`Создан пользователь = ${userIdElem.value ? userIdElem.value : 'example@example.ru'}`, res))
            .catch( e => console.log(e));
    }//*********
    function handlerUpdate(e) {
        chatDb.updateUser( userIdElem.value ? userIdElem.value : chatDb.userId,{ name: 'name', address: {city: 'blg'} }, console.log )
            .then( () => console.log(`Обновлен пользователь ${userIdElem.value ? userIdElem.value : chatDb.userId}`))
            .catch( e => console.log(e));
    }//*********
    function handlerDelete(e) {
        chatDb._deleteUser(userIdElem.value ? userIdElem.value : chatDb.userId, console.log)
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

    function handlerSendMessage(e) {
        chatDb.sendMessage(roomIdElem.value, messageElem.value, 'default', console.log)
    }//*********
    function handlerUpdateMessage() {
        chatDb.updateMessage(roomIdElem.value, messageIdElem.value, messageElem.value, console.log)
    }//*********
    function handlerDeleteMessage(e) {
        chatDb.deleteMessage(roomIdElem.value, messageIdElem.value, console.log)
    }//*********
    function handlerOn(e) {
        chatDb.addEventListener(eventNameElem.value, noop);
    }//*********
    function handlerOnRemove(e) {
        chatDb.removeEventListener(eventNameElem.value, noop);
    }//*********
    function handlerDispatchEvent(e) {
        chatDb.dispatchEvent({event: eventNameElem.value, detail: `any detail: ${eventNameElem.value}`});
    }//*********
    async function handlerSearchUserEmail(e) {
        console.log( await chatDb.searchUserEmail(userEmailElem.value) );
    }

    return (
        <div>
            <h1>Здесь будет профиль!!!</h1>
            <hr />
            <h1>ТЕСТ БАЗЫ ДАННЫХ:</h1>
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
            <hr />
            <label>message id: <input id={'messageIdElem'} /></label>
            <br />
            <label>message: <input id={'messageElem'} /></label>
            <br />
            <button onClick={handlerSendMessage} className={'btn btn-outline-success'}>send message</button>
            <button onClick={handlerUpdateMessage} className={'btn btn-outline-success'}>update message</button>
            <button onClick={handlerDeleteMessage} className={'btn btn-outline-success'}>delete message</button>
            <hr />
            <label>event name: <input id={'eventNameElem'} /></label>
            <br />
            <button onClick={handlerOn} className={'btn btn-outline-success'}>on</button>
            <button onClick={handlerOnRemove} className={'btn btn-outline-success'}>on remove</button>
            <button onClick={handlerDispatchEvent} className={'btn btn-outline-success'}>dispatch event</button>
            <hr />
            <label>user email: <input id={'userEmailElem'} /></label>
            <br />
            <button onClick={handlerSearchUserEmail} className={'btn btn-outline-success'}>search user email</button>
        </div>
    )
}