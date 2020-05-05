import React from 'react';
import DB from ".././db";
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
    async function handlergetGetChatMessages(e) {
        let messages = await chatDb.getRoomMessages('room1');
        console.log(messages);
    }//*********
    async function handlerDeleteChatFromUserProfile(e) {
        let userData = await chatDb.getUserData(chatDb.user);
        chatDb.deleteChatFromUserProfile(userData.chats[2]);
    }
    async function handlerUpdateChat(e) {
        let userData = await chatDb.getUserData(chatDb.user);
        chatDb.updateChat(userData.chats[2], {name: 'chat3'})
            .then( () => console.log('Обновлен chat'))
            .catch( e => console.log(e))
    }
    async function handlerDeleteChat(e) {
        let userData = await chatDb.getUserData(chatDb.user);
        console.log(await chatDb.deleteChat(userData.chats[2]));
    }

    return (
        <div>
            Profile
            <DB />
            <hr />
            <button onClick={handlerGetInfo} className={'btn btn-outline-success'}>get info</button>
            <button onClick={handlerCreate} className={'btn btn-outline-success'}>create user</button>
            <button onClick={handlerUpdate} className={'btn btn-outline-success'}>updete user</button>
            <button onClick={handlerDelete} className={'btn btn-outline-success'}>delete user</button>
            <hr />
            <button onClick={handlergetGetChatMessages} className={'btn btn-outline-success'}>get chat messages</button>
            <button onClick={handlerDeleteChatFromUserProfile}>delete chat from user profile</button>
            <button onClick={handlerUpdateChat}>update chat</button>
            <button onClick={handlerDeleteChat}>delete chat</button>
        </div>
    )
}