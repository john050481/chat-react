// Hook (useChatFirebase.js)
import React, { useState, useEffect } from "react";
import {useAuth} from "./useAuth";
import usersModel from '../model/users';
import roomMessagesModel from '../model/roomMessages';

export function useChatFirebase() {
    const auth = useAuth();
    const db = auth.firebase.firestore();
    const firebase = auth.firebase;
    const [userId, setUserId] = useState(null);
    const [subscribers, setSubscribers] = useState([]);

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
        let unsubscribe = db.collection("room-messages").doc(roomId).collection("messages").onSnapshot(function (snapshot){
            console.log('--- ИЗМЕНЕНИЯ В СООБЩЕНИЯХ ---');
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
    function unsubscribeAllRooms() {
        subscribers.forEach( item => item.unsubscribe() );
        setSubscribers( []);
    }//*********

    function sendMessage() {}
    function updateMessage() {}
    function deleteMessage() {}

    async function createRoom(roomName, roomType, callback) {
        const roomId = await db.collection('room-users').add({})
        .then( docRef => docRef.id );

        await db.collection('room-messages').doc(roomId).set({});

        /* так можно добавить сразу и коллекцию "messages" и новый док с сообщением
        await db.collection('room-messages').doc(roomId)
            .collection('messages').add({
                ...roomMessagesModel,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        */

        await db.collection('room-metadata').doc(roomId).set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), // The time at which the room was created.
            createdByUserId: userId, // The id of the user that created the room.
            id: roomId, // The id of the room.
            name: roomName, // The public display name of the room.
            type: roomType // The type of room, public or private.
        });

        callback && callback(roomId);
        return roomId;
    }//*********
    function getRoom(roomId, callback) {
        db.collection('room-metadata').doc(roomId).get()
        .then( doc => {
            callback && callback(doc.data());
            return doc.data();
        })
    }//*********
    function updateRoom(roomRef, data) {
        return roomRef.set({...data}, { merge: true })
    }
    async function deleteRoom(roomRef) {
        await roomRef.collection("messages").get().then( querySnapshot => {
            querySnapshot.forEach( doc => doc.ref.delete().then(() => true) )
        } );
        return roomRef.delete().then(() => true)
    }
    function getRoomMessages(roomId) {
        return db.collection("room-messages").doc(roomId).collection("messages").get().then( querySnapshot => {
            let messages = [];
            querySnapshot.forEach(function(doc) {
                messages.push(doc.data());
            });
            return messages;
        });
    }//*********
    function addRoomInUserProfile() {}
    async function deleteRoomFromUserProfile(roomRef) {
        let userData = await this.user.get().then( querySnapshot => querySnapshot.data() );
        let filteredRooms = userData.rooms.filter( item => item.id !== roomRef.id);
        updateUser.call({user}, {rooms: filteredRooms});
        unsubscribeRoom(roomRef);
    }

    function getUserData(userId) {
        return db.collection('users').doc(userId).get().then( (doc) => doc.data() )
    }//*********
    function getUserRef(userId) {
        return db.collection('/users').doc(userId)
    }//*********

    return {
        userId,
        subscribers, /////////////////////////////

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
        getRoom,
        updateRoom,
        deleteRoom,
        getRoomMessages,
        addRoomInUserProfile,
        deleteRoomFromUserProfile,

        getUserData,
        getUserRef
    };
}