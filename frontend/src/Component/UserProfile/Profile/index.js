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
    function handlergetRoomMetadata(e) {
        chatDb.getRoomMetadata('room1', console.log);
    }//*********
    function handlerenterRoom(e) {
        chatDb.enterRoom('room1').then( () => console.log('Enterd Room!!') );
    }//*********
    function handlerleaveRoom(e) {}
    async function handlerupdateRoomMetadata(e) {
        chatDb.updateRoomMetadata('room1', 'new name room #1', 'public', console.log)
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
            <button onClick={handlergetRoomMetadata} className={'btn btn-outline-success'}>get metadata room</button>
            <br/>
            <button onClick={handlercreateRoom} className={'btn btn-outline-success'}>create room</button>
            <button onClick={handlerDeleteRoom} className={'btn btn-outline-danger'}>delete room</button>
            <br/>
            <button onClick={handlerenterRoom} className={'btn btn-outline-success'}>enter room</button>
            <button onClick={handlerleaveRoom} >leave room</button>
            <br/>
            <button onClick={handlerupdateRoomMetadata} className={'btn btn-outline-success'}>update room metadata</button>
        </div>
    )
}