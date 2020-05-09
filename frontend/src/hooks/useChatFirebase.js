// Hook (useChatFirebase.js)
import React, {useState, useEffect, useCallback} from "react";
import {useAuth} from "./useAuth";
import usersModel from '../model/users';
import roomMessagesModel from '../model/roomMessages';

export function useChatFirebase() {
    const auth = useAuth();
    const db = auth.firebase.firestore();
    const firebase = auth.firebase;

    let chatSubscribers = {};
    const events = ['user-update', 'room-enter', 'room-exit', 'message-add', 'message-remove', 'room-invite', 'room-invite-response'];

    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    console.log('Render useChatFirebase');

    //---------------------------------------------------------------
    useEffect( () => {
        console.log('1111111111111111111', userId, userData);
        if (!auth.user) return;

        let unsubscribeUser = db.collection("users").doc(auth.user.uid)
            .onSnapshot(function(DocumentReferenceUser) {
                console.log('1111111111111111111_11111111111111111111', userId, userData);

                if (!DocumentReferenceUser.exists) {
                    createUser(auth.user.uid, auth.user.email/*, (userId) => setUserId(userId)*/);
                    return;
                }

                setUserId(DocumentReferenceUser.id);
                setUserData(DocumentReferenceUser.data());
            });

        return () => unsubscribeUser();

    },  [auth/*, userId, userData*/] );
    //---------------------------------------------------------------
    useEffect( () => {
        const subscribers = [];
        console.log('2222222222222222_START', subscribers, userData);

        if (!userData) return;

        userData.rooms.forEach( roomId => {
            const unsubscribe = subscribeRoomMessages(roomId);
            console.log('2222222222222222_SUBSCRIBE+++: ', roomId, unsubscribe);
            subscribers.push({roomId, unsubscribe});
        } );

        return () => {
            console.log('2222222222222222_END: ', subscribers, userData);
            subscribers.forEach( item => {
                console.log('2222222222222222_UN_SUBSCRIBE---', item);
                item.unsubscribe()
            } );
        }

    }, [userData] );
    //---------------------------------------------------------------

    function createUser(userId, email, callback) {
        return db.collection("users").doc(userId).set({ ...usersModel, id: userId, email })
            .then( () => {
                callback && callback(userId)
                return userId;
            })
    }//*********
    function updateUser(userId, data, callback) {
        return getUserRef(userId).set({...data}, { merge: true })
            .then( () => {
                callback && callback(userId)
                return userId;
            })
    }//*********
    function deleteUser(userId, callback) {
        return getUserRef(userId).delete()
            .then(function() {
                callback && callback(userId);
                return userId;
            })
    }//*********

    function subscribeRoomMessages(roomId) {
        let firstRun = true;
        let unsubscribe = db.collection("room-messages").doc(roomId).collection("messages").onSnapshot(function (snapshot){
            console.log(`--- ИЗМЕНЕНИЯ В СООБЩЕНИЯХ ${roomId} --- firstRun: ${firstRun} ---`);
            if (firstRun) firstRun = false;
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("added! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                }
                if (change.type === "modified") {
                    console.log("modified! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                }
                if (change.type === "removed") {
                    console.log("removed! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                }
            });
        });
        return unsubscribe;
    }//*********

    function sendMessage(roomId, messageContent, messageType='default', callback) {
        db.collection('room-messages').doc(roomId).collection('messages').add({
            ...roomMessagesModel,
            userId: this.userId,
            name: "!!!Any name!!!",
            message: messageContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then( (docRef) => {
                callback && callback(docRef);
                return docRef;
            })
    }//*********
    function updateMessage(roomId, messageId, data, callback) {
        return db.collection('room-messages').doc(roomId).collection('messages').doc(messageId).set({message: data}, {merge: true})
            .then( () => {
                callback && callback(messageId)
                return true;
            })
    }//*********
    function deleteMessage(roomId, messageId, callback) {
        db.collection('room-messages').doc(roomId).collection('messages').doc(messageId).delete()
            .then( () => {
                callback && callback(messageId)
                return true;
            })
    }//*********

    function createRoom(roomName, roomType, callback) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        // docRefRoomUsers - это просто ссылка, она ничего не записывает в базу
        // она нужна чтоб получить "roomId", чтоб потом его записать в три коллекции
        // т.е. roomId - одинаковый для "room-users", "room-messages", "room-metadata"
        const docRefRoomUsers = db.collection('room-users').doc();
        const roomId = docRefRoomUsers.id;
        batch.set(docRefRoomUsers, {});

        const docRefRoomMessages = db.collection('room-messages').doc(roomId);
        batch.set(docRefRoomMessages, {});

        const docRefRoomMetadata = db.collection('room-metadata').doc(roomId);
        batch.set(docRefRoomMetadata, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), // The time at which the room was created.
            createdByUserId: this.userId, // The id of the user that created the room.
            id: roomId, // The id of the room.
            name: roomName, // The public display name of the room.
            type: roomType // The type of room, public or private.
        });

        return batch.commit()
        .then(function () {
            callback && callback(roomId);
            return roomId;
        });
    }//*********
    function getRoomMetadata(roomId, callback) {
        db.collection('room-metadata').doc(roomId).get()
        .then( doc => {
            callback && callback(doc.data());
            return doc.data();
        })
    }//*********
    function updateRoomMetadata(roomId, roomName, roomType, callback) {
        let newData = Object.assign({name: roomName}, roomType ? {type: roomType} : {});
        return db.collection('room-metadata').doc(roomId).set(newData, { merge: true })
            .then(function () {
                callback && callback(true);
                return true;
            });
    }//*********
    async function deleteRoom(roomId, callback) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomUsers = db.collection('room-users').doc(roomId);
        batch.delete(docRefRoomUsers);
        //сначала удалить все доки из коллекции users; batch поддерживает 500 операций!!!!!!!!!!!!!!!!!!!!!!!
            await docRefRoomUsers.collection('users').get().then( querySnapshot => {
                querySnapshot.forEach( doc => doc.ref.delete() )
            } );

        const docRefRoomMessages = db.collection('room-messages').doc(roomId);
        batch.delete(docRefRoomMessages);
        //сначала удалить все доки из коллекции messages; batch поддерживает 500 операций!!!!!!!!!!!!!!!!!!!!!!!
            await docRefRoomMessages.collection('messages').get().then( querySnapshot => {
                querySnapshot.forEach( doc => doc.ref.delete() )
            } );

        const docRefRoomMetadata = db.collection('room-metadata').doc(roomId);
        batch.delete(docRefRoomMetadata);

        return batch.commit()
            .then(function () {
                callback && callback(true);
                return true;
            });
    }//!!!!!!!!!!!!!!!!!!! ПРОБЛЕМА !!!!!!!!!!!!!!!!!!!
    function getRoomMessages(roomId) {
        return db.collection("room-messages").doc(roomId).collection("messages").get().then( querySnapshot => {
            let messages = [];
            querySnapshot.forEach(function(doc) {
                messages.push(doc.data());
            });
            return messages;
        });
    }//*********
    function enterRoom(roomId) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomUsers = db.collection('room-users').doc(roomId).collection('users').doc(this.userId);
        batch.set(docRefRoomUsers, {id: this.userId});

        const docRefUsers = db.collection('users').doc(this.userId);
        batch.update(docRefUsers, {rooms: firebase.firestore.FieldValue.arrayUnion(roomId)});

        return batch.commit();
    }//*********
    function leaveRoom(roomId) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomUsers = db.collection('room-users').doc(roomId).collection('users').doc(this.userId);
        batch.delete(docRefRoomUsers);

        const docRefUsers = db.collection('users').doc(this.userId);
        batch.update(docRefUsers, {rooms: firebase.firestore.FieldValue.arrayRemove(roomId)});

        return batch.commit();
    }//*********

    function getUserData(userId) {
        return db.collection('users').doc(userId).get().then( (doc) => doc.data() )
    }//*********
    function getUserRef(userId) {
        return db.collection('/users').doc(userId)
    }//*********

    function on(event, callback) {
        /* смотри выше: const events = ['user-update', 'room-enter', 'room-exit', 'message-add', 'message-remove', 'room-invite', 'room-invite-response'];
        user-update - Invoked when the user's metadata changes.
        room-enter - Invoked when the user successfully enters a room.
        room-exit - Invoked when the user exists a room.
        message-add - Invoked when a new message is received.
        message-remove - Invoked when a message is deleted.
        room-invite - Invoked when a new room invite is received.
        room-invite-response - Invoked when a response to a previous invite is received.
        */
        if (!events.find( item => item === event ) ) return false;

        console.log("###1 chatSubscribers === ", chatSubscribers);
        let eventListeners = chatSubscribers[event] || [];
        console.log("###2 eventListeners === ", eventListeners);

        if ( eventListeners.find( item => {
            console.log("###3 item === callback, item, callback === ", item === callback, item, callback);
            return item === callback;
        }) ) return true;

        console.log("###4", eventListeners);
        eventListeners.push(callback);
        chatSubscribers[event] = eventListeners;
    }
    function onRemove(event, callback) {

    }

    return {
        userId,
        userData,
        chatSubscribers,

        createUser,
        updateUser,
        deleteUser,

        subscribeRoomMessages,

        sendMessage,
        updateMessage,
        deleteMessage,

        createRoom,
        getRoomMetadata,
        updateRoomMetadata,
        deleteRoom,
        getRoomMessages,
        enterRoom,
        leaveRoom,

        getUserData,
        getUserRef,

        on,
        onRemove
    };
}