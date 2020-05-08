// Hook (useChatFirebase.js)
import React, {useState, useEffect, useCallback} from "react";
import {useAuth} from "./useAuth";
import usersModel from '../model/users';
import roomMessagesModel from '../model/roomMessages';

export function useChatFirebase() {
    const auth = useAuth();
    const db = auth.firebase.firestore();
    const firebase = auth.firebase;
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [subscribers, setSubscribers] = useState([]);

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
        console.log('2222222222222222_START', subscribers, userData);
        if (!userData) return;

        // subscribers.forEach( item => {
        //     console.log('2222222222222222_UN_SUBSCRIBE---', item);
        //     item.unsubscribe()
        // } );
        setSubscribers([]);
        //console.log('2222222222222222_AFTER_UN_SUBSCRIBE', subscribers);

        userData.rooms.forEach( roomId => {
            console.log('2222222222222222_SUBSCRIBE+++: ', roomId);
            subscribeRoom(roomId)
        } );

        return () => {
            console.log('2222222222222222_END: ', subscribers, userData);
            //unsubscribeAllRooms();
        }

    }, [userData] );
    //---------------------------------------------------------------
    useEffect( () => {
        console.log('3333333333333333_START', subscribers);
        return () => {
            console.log('3333333333333333_END', subscribers);
            subscribers.forEach( item => {
                console.log('3333333333333333_UN_SUBSCRIBE---', item);
                item.unsubscribe()
            } );
            //setSubscribers([]);
        }
    }, [subscribers]);
    //---------------------------------------------------------------
/*
    useEffect(
        () => {
            if (!auth.user) return;

            let unsubscribeUser = db.collection("users").doc(auth.user.uid)
                .onSnapshot(function(DocumentReferenceUser) {

                    if (!DocumentReferenceUser.exists) {
                        createUser(auth.user.uid, auth.user.email, (userId) => setUserId(userId));
                        return;
                    }

                    setUserId(DocumentReferenceUser.id);

                    unsubscribeAllRooms();
                    DocumentReferenceUser.data().rooms.forEach( roomId => subscribeRoom(roomId) );
                });

            return () => {
                unsubscribeUser();
                unsubscribeAllRooms();
            };
        },
        [auth]
    );
*/
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

    function subscribeRoom(roomId) {
        let firstRun = true;
        let unsubscribe = db.collection("room-messages").doc(roomId).collection("messages").onSnapshot(function (snapshot){
            console.log(`--- ИЗМЕНЕНИЯ В СООБЩЕНИЯХ ${roomId} --- first run: ${firstRun} ---`);
            if (firstRun) firstRun = false;
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New message: ", change.doc.data(), change.doc);
                }
                if (change.type === "modified") {
                    console.log("Modified message: ", change.doc.data(), change.doc);
                }
                if (change.type === "removed") {
                    console.log("Removed message: ", change.doc.data(), change.doc);
                }
            });
        });
        setSubscribers( prev => [...prev, {roomId, unsubscribe}] );
    }//*********
    function unsubscribeRoom(roomId) {
        const unsubscribe = subscribers.find( item => item.roomId == roomId);
        unsubscribe.unsubscribe();
        setSubscribers( prev => prev.filter( item => item.roomId != roomId) );
    }//*********
    const unsubscribeAllRooms = useCallback( () => {
        console.log('33333333333333333', subscribers);
        subscribers.forEach( item => {
            console.log('33333333333333333_333333333333', item);
            item.unsubscribe()
        } );
        setSubscribers( []);
    }, [subscribers])//*********

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

    return {
        userId,
        userData,
        subscribers, //!!!!!!!!!!!!!!!!!!! УБРАТЬ !!!!!!!!!!!!!!!!!!!

        createUser,
        updateUser,
        deleteUser,

        subscribeRoom,
        unsubscribeRoom,
        unsubscribeAllRooms,

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
        getUserRef
    };
}