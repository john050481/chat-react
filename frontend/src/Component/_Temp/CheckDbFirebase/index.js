import React, {useEffect, useRef} from 'react';
import {useChat} from "../../../hooks/useChatFirebase"
import {useAuth} from "../../../hooks/useAuth";

let roomIdElem = null;
let userIdElem = null;
let messageIdElem = null;
let messageElem = null;
let eventNameElem = null;
let userEmailElem = null;

export default function (props) {
    console.log('Render Profile');

    const auth = useAuth();
    const chatDb = useChat();
    const db = auth.firebase.firestore();
    const firebase = auth.firebase;

    const noop = useRef( (event) => console.log('EVENT: ', event) );

    useEffect( () => {
        roomIdElem = document.getElementById('roomIdElem');
        userIdElem = document.getElementById('userIdElem');
        messageIdElem = document.getElementById('messageIdElem');
        messageElem = document.getElementById('messageElem');
        eventNameElem = document.getElementById('eventNameElem');
        userEmailElem = document.getElementById('userEmailElem');
    }, []);

    async function handlerGetInfo(e) {
        console.log('chatDb === ', chatDb);
        console.log('getUserData input.value === ', await chatDb.getUserData(userIdElem.value));
        console.log('getUserData this === ', await chatDb.getUserData());
        console.log('getUserRef input.value === ', await chatDb.getUserRef(userIdElem.value));
        console.log('getUserRef this ===', await chatDb.getUserRef());
    }//*********
    function handlerCreate(e) {
        chatDb._createUser(userIdElem.value, {email: 'example@example.ru'}, console.log)
            .then( res => console.log(`Создан пользователь = ${userIdElem.value ? userIdElem.value : 'example@example.ru'}`, res))
            .catch( e => console.log(e));
    }//*********
    function handlerUpdate(e) {
        chatDb.updateUser( userIdElem.value, { name: 'name', address: {city: 'blg'} }, console.log )
            .then( () => console.log(`Обновлен пользователь ${userIdElem.value ? userIdElem.value : chatDb.userId}`))
            .catch( e => console.log(e));
    }//*********
    function handlerDelete(e) {
        chatDb._deleteUser(userIdElem.value, console.log)
            .then( () => console.log(`Удален пользователь ${userIdElem.value ? userIdElem.value : chatDb.userId}`))
            .catch( e => console.log(e));
    }//*********
    async function handlerGetUserRoomsMetadata(e) {
        try {
            let meta = await chatDb.getUserRoomsMetadata(userIdElem.value);
            console.log('handlerGetUserRoomsMetadata === ', meta);
        } catch (e) {
            console.log('ERR === ', e)
        }
    }
    async function handlergetGetRoomMessages(e) {
        let messages = await chatDb.getRoomMessages(roomIdElem.value);
        console.log(messages);
    }//*********
    async function handlergetRoomUsers(e) {
        let usersIds = await chatDb.getRoomUsersIds(roomIdElem.value);
        console.log('room users = ', usersIds);
    }//*********
    async function handlercreateRoom(e) {
        const result = chatDb.createRoom('roomCreate', 'private', console.log);
        console.log('result = ', await result);
    }//*********
    async function handlergetRoomMetadata(e) {
        let meta = await chatDb.getRoomMetadata(roomIdElem.value);
        console.log(meta);
    }//*********
    function handlerenterRoom(e) {
        chatDb.enterRoom(roomIdElem.value, console.log).then( () => console.log(`Enterd ${roomIdElem.value}`) );
    }//*********
    function handlerleaveRoom(e) {
        chatDb.leaveRoom(roomIdElem.value, console.log).then( () => console.log(`Deleted ${roomIdElem.value}!!`) );
    }//*********
    async function handlerupdateRoomMetadata(e) {
        chatDb.updateRoomMetadata(roomIdElem.value, `new name room`, 'public', console.log)
        .then( () => console.log('Room обновлена!'))
        .catch( e => console.log(e))
    }//*********
    async function handlerDeleteRoom(e) {
        chatDb._deleteRoom(roomIdElem.value, console.log);
    }//!!!!!!!!! ПРОБЛЕМА, см. "useChatFirebase"

    function handlerSendMessage(e) {
            chatDb.sendMessage(roomIdElem.value, messageElem.value, 'default', false, '', console.log)
                .then( res => console.log('then sendMessage TRUE, res = ', res))
                .catch( err => console.log('catch sendMessage FALSE, err = ', err))
    }//*********
    function handlerUpdateMessage() {
        chatDb.updateMessage(roomIdElem.value, messageIdElem.value, messageElem.value, console.log)
    }//*********
    function handlerDeleteMessage(e) {
        chatDb.deleteMessage(roomIdElem.value, messageIdElem.value, console.log)
    }//*********
    function handlerOn(e) {
        chatDb.addEventListener(eventNameElem.value, noop.current);
        chatDb.addEventListener(eventNameElem.value, (event) => console.log("EVENT: ", event));
    }//*********
    function handlerOnRemove(e) {
        chatDb.removeEventListener(eventNameElem.value, noop.current);
    }//*********
    function handlerDispatchEvent(e) {
        chatDb.dispatchEvent({event: eventNameElem.value, detail: `any detail: ${eventNameElem.value}`});
    }//*********
    async function handlerSearchUserEmail(e) {
        console.log( await chatDb.searchUserEmail(userEmailElem.value) );
    }//*********
    function handelUpdateMessageStatus(e) {
        chatDb.userIsReadMessage('room1', 'Rzh4e3e93kifCL4OY2Lu', '123');
    }
    async function handleCountUnreadMessage(e) {
        const numberUnreadMessage = await chatDb.getNumberOfUnreadMessagesForRoom("room1", "JrdremgStrhMrv956wwyxLvWDSE3");
        console.log("numberUnreadMessage for room: room1 & userId: JrdremgStrhMrv956wwyxLvWDSE3 === ", numberUnreadMessage);
    }
    async function handelGetNumberOfUnreadMessagesForAllRoom(e) {
        let res = await chatDb.getNumberOfUnreadMessagesForAllRoom();
        console.log("handelGetNumberOfUnreadMessagesForAllRoom = ", res);
    }
    async function handelPaginateQuery1(e) {
        let lastVisible = new firebase.firestore.Timestamp.fromDate(new Date('2020', '05', '19', '00', '38', '08'));

        console.log("lastVisible/init = ", lastVisible);

        async function* getNextMessages() {
            while (lastVisible !== undefined) {
                yield db.collection("room-messages").doc("room1").collection("messages")
                    .orderBy("timestamp", "desc")
                    .startAfter(lastVisible)
                    .limit(5)
                    .get()
                    .then( documentSnapshots => {
                        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
                        console.log("last/first", lastVisible);

                        let messages = [];
                        documentSnapshots.forEach(doc => {
                            messages.push({...doc.data(), id: doc.id});
                        });
                        return messages;
                    });
            }
        }

        for await (let documentSnapshots of getNextMessages()) {
            documentSnapshots.forEach( documentSnapshots => {
                console.log(documentSnapshots.id, documentSnapshots.data()?.timestamp);
            })
        }
        /* или */
        // const generator = getNextMessages();
        // console.log(await generator.next());
        // console.log(await generator.next());
        // console.log(await generator.next());
        // console.log(await generator.next());
        // console.log(await generator.next());
        // console.log(await generator.next());
        // console.log(await generator.next());
    }// рабочий вариант, но... нужно задавать "let lastVisible = ...", во втором варианте мы начинаем с РЕАЛЬНО последней записи чата!
    async function handelPaginateQuery2(e) {
        let lastVisible = null;

        function getMessagesAndStatuses(documentSnapshots) {
            lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log("last/first", lastVisible);

            let messages = [];
            let statuses = [];
            documentSnapshots.forEach( async (doc) => {
                messages.push({...doc.data(), id: doc.id});

                const status = await chatDb.getRoomMessageStatus("room1", doc.id);
                statuses.push(status);
            });
            return {messages: messages.reverse(), statuses: statuses.reverse(), lastVisible};
        };

        async function* getNextMessages() {
            const refCollection = db.collection("room-messages").doc("room1").collection("messages").orderBy("timestamp", "desc");
            /**/
            yield refCollection
                .limit(5)
                .get()
                .then( getMessagesAndStatuses );

            while (lastVisible) {
                yield refCollection
                    .startAfter(lastVisible)
                    .limit(5)
                    .get()
                    .then( getMessagesAndStatuses );
            /**/
            }
        }

        // for await (let documentSnapshots of getNextMessages()) {
        //     documentSnapshots.forEach( documentSnapshots => {
        //         console.log(documentSnapshots.id);
        //     })
        // }
        /* или */
        const generator = getNextMessages();
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
    }// рабочий вариант, длинный, но правильный
    async function handelPaginateQuery(e) {
        const generator = chatDb.getMessagesAndStatusesWithLimit("room1", 5);
        console.log("generator = ", generator);
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
        console.log(await generator.next());
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
            <button onClick={handlerGetUserRoomsMetadata} className={'btn btn-outline-success'}>get user rooms metadata</button>
            <hr />
            <label>room id: <input id={'roomIdElem'} /></label>
            <br />
            <button onClick={handlergetGetRoomMessages} className={'btn btn-outline-success'}>get room messages</button>
            <button onClick={handlergetRoomUsers} className={'btn btn-outline-success'}>get room users</button>
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
            <hr />
            <button onClick={handelUpdateMessageStatus} className={'btn btn-outline-success'}>update Message Status</button>
            <hr />
            <button onClick={handleCountUnreadMessage} className={'btn btn-outline-success'}>handle Count Unread Message</button>
            <button onClick={handelGetNumberOfUnreadMessagesForAllRoom} className={'btn btn-outline-success'}>handel Get Number Of Unread Messages For All Room</button>
            <hr />
            <button onClick={handelPaginateQuery}>handelPaginateQuery</button>
        </div>
    )
}