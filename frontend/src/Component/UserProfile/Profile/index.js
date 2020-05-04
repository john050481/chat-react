import React from 'react';
import DB from ".././db";
import {useChatDb} from "../../../hooks/useChatDb";

export default function (props) {
    const chatDb = useChatDb();

    async function handlerGetInfo(e) {
        console.log(chatDb, await chatDb.getUserData(chatDb.user));
    }
    function handlerCreate(e) {
        chatDb.createUser('example@example.ru')
            .then( createdUser => console.log('Создан пользователь = ', createdUser))
            .catch( e => console.log(e));
    }
    function handlerUpdate(e) {
        chatDb.updateUser( { name: 'name', address: {city: 'blg'} } )
            .then( () => console.log('Обновлен пользователь'))
            .catch( e => console.log(e));
    }
    function handlerDelete(e) {
        chatDb.deleteUser()
            .then( () => console.log('Удален пользователь'))
            .catch( e => console.log(e));
    }
    async function handlergetGetChatMessages(e) {
        let userData = await chatDb.getUserData(chatDb.user);
        let messages = await chatDb.getChatMessages(userData.chats[0]);
        console.log(messages);

        for (const message of messages) {
            let userFrom = await chatDb.getUserData(message.from);
            console.log('userFrom = ', userFrom)
        }
    }
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
            <button onClick={handlerGetInfo}>get info</button>
            <button onClick={handlerCreate}>create user</button>
            <button onClick={handlerUpdate}>updete user</button>
            <button onClick={handlerDelete}>delete user</button>
            <hr />
            <button onClick={handlergetGetChatMessages}>get chat messages</button>
            <button onClick={handlerDeleteChatFromUserProfile}>delete chat from user profile</button>
            <button onClick={handlerUpdateChat}>update chat</button>
            <button onClick={handlerDeleteChat}>delete chat</button>
        </div>
    )
}