// Hook (useChatFirebase.js)
import React, {useState, useEffect, useRef, createContext, useContext} from "react";
import {useAuth} from "./useAuth";
import usersModel from '../model/users';
import roomMessagesModel from '../model/roomMessages';
import roomMetadataModel from '../model/roomMetadata';
import diffArrays from "../common/diffArrays";
import usePrevious from '../hooks/usePrevious';

const chatContext = createContext();

export function ProvideChat({ children }) {
    const chat = useProvideChat();
    return <chatContext.Provider value={chat}>{children}</chatContext.Provider>;
}

export const useChat = () => {
    return useContext(chatContext);
};

function useProvideChat() {
    const auth = useAuth();
    const db = auth.firebase.firestore();
    const firebase = auth.firebase;

    const chatEventListeners = useRef({});
    const events = [
        'user-update',
        'room-enter',
        'room-exit',
        'message-add',
        'message-remove',
        'room-invite',
        'room-invite-response'
    ];

    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const prevUserData = usePrevious(userData);
    const subscribersUserRooms = useRef([]);

    console.log('Render useChatFirebase');

    //---------------------------------------------------------------
    useEffect( () => {
        if (!auth.user) {
            setUserId(null);
            setUserData(null);
            return;
        }

        const unsubscribeUser = db.collection("users").doc(auth.user.uid)
            .onSnapshot(function(DocumentReferenceUser) {

                if (!DocumentReferenceUser.exists) {
                    _createUser( auth.user.uid, {email: auth.user.email} );
                    return;
                }

                setUserId(DocumentReferenceUser.id);
                setUserData(DocumentReferenceUser.data());
            });

        return unsubscribeUser;

    },  [auth] );
    //---------------------------------------------------------------
    useEffect( () => {
        dispatchEvent( { event: 'user-update', detail: {userData} } );

        if (!userData) return;

        /*
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('prevUserData = ', prevUserData);
        console.log('userData = ', userData);
        */
        const _prevUserDataRooms = prevUserData ? prevUserData.rooms : [];
        const _curUserDataRooms = userData ? userData.rooms : [];
        const needSubscribe = diffArrays(_curUserDataRooms, _prevUserDataRooms);
        const needUnsubscribe = diffArrays(_prevUserDataRooms, _curUserDataRooms);
        /*
        console.log('нужно подписаться на эти комнаты = need SUB scribe = ', needSubscribe);
        console.log('нужно отписаться с этих комнат = need UN subscribe = ', needUnsubscribe);
        console.log('на выходе должы быть подписаны на эти комнаты = _curUserDataRooms = ', _curUserDataRooms);
        console.log('текущие subscribers = subscribersUserRooms.current = ', [...subscribersUserRooms.current]);
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        */
        // ОТПИСЫВАЕМСЯ
        subscribersUserRooms.current = subscribersUserRooms.current.filter( subscriber => {
            if ( needUnsubscribe.find( unsubscribeRoomId => unsubscribeRoomId === subscriber.roomId) ) {
                subscriber.unsubscribe();
                return false;
            }
            return true;
        } );
        // ПОДПИСЫВАЕМСЯ
        needSubscribe.forEach( roomId => {
            const unsubscribe = _subscribeRoomMessages(roomId);
            subscribersUserRooms.current.push({roomId, unsubscribe});
        } );
    }, [userData] );
    //---------------------------------------------------------------
    useEffect( () => {
        /*
        Создал этот эффект, т.к. в верхнем эфекте, при отписке (в функции возвращаемой return),
        желательно НЕ отписываться от всех сабскрайберов, а сравнивать сабскрайберы!
        Т.е. к каим комнатам подписан в данный момент и к каим должен быть подписан в следующий.
        А для этого нужно предыдущее, текущее и следующее состояние ("prev", "current", "next")!
        С "prev" и "current" проблем нет, а с next ЕСТЬ!
        Поэтому этот хук отписывается от всего, при демонтировании компонента, когда меняется "userId"!
        А в верхнем эффекте, при монтировании (т.е. когда меняется userData), мы сравниваем массивы "rooms",
        Т.е. к каким комнатам мы подписаны сейчас (а СЕЙЧАС - это в предыдущем состоянии - prevUserData.rooms),
        и к каим должны быть подписаны, при текущем состоянии (текущее сосотояние находится в - userData.rooms).
        Т.е. верхний эффект срабатывает при изменении "userData", и мы должны проверить изменилось ли
        поле "rooms" в "userData", и если изменения там произошли, то нужно подписаться на добавленную
        комнату, или отписаться (если комнату удалили).
        Т.е. "userData" может меняться по куче причин, и нам не обязательно отписывать/подписываться заново,
        а "userId" меняется если пользователь сменился или вышел, вот тут мы и отписываемся от ВСЕГО!
        */
        return () => {
            /*
            console.log('*************************************************************************************');
            console.log('ОТПИСКА от subscribersUserRooms = ', [...subscribersUserRooms.current]);
            console.log('*************************************************************************************');
            */
            subscribersUserRooms.current.forEach( item => item.unsubscribe() );
            subscribersUserRooms.current.length = 0;
        }
    }, [userId]);
    //---------------------------------------------------------------

    function _createUser(userId, data, callback) {
        const newDocRef = userId ? db.collection("users").doc(userId) : db.collection("users").doc()
        const newId = newDocRef.id;

        return newDocRef.set({ ...usersModel, ...data, id: newId })
            .then( () => {
                callback && callback(newId)
                return newId;
            })
    }//*********null
    function updateUser(userId, data, callback) {
        const curUserId = userId || this.userId; //если нет "userId", то берем "this.userId"

        return getUserRef(curUserId).set({...data}, { merge: true })
            .then( () => {
                callback && callback(curUserId)
                return curUserId;
            })
    }//*********this
    function _deleteUser(userId, callback) {
        const curUserId = userId || this.userId; //если нет "userId", то берем "this.userId"

        return getUserRef(curUserId).delete()
            .then(function() {
                callback && callback(curUserId);
                return curUserId;
            })
    }//*********this

    function _subscribeRoomMessages(roomId) {
        let firstRun = true;
        const unsubscribe = db.collection("room-messages").doc(roomId).collection("messages").onSnapshot(function (snapshot){
            console.log('---------------useChatFirebase---------------');
            console.log(`--- ИЗМЕНЕНИЯ В СООБЩЕНИЯХ ${roomId} --- firstRun: ${firstRun} ---`);

            let source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
            console.log('source = ', source);

            if (firstRun) {
                firstRun = false;
                return;
            }
            snapshot.docChanges().forEach(function(change) {
                //console.log('path array === ', change.doc.ref.path.split('/'));
                if (change.type === "added") {
                    console.log("added! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                    dispatchEvent( {event: 'message-add', detail: {id: change.doc.id, message: change.doc.data(), path: change.doc.ref.path} } );
                }
                if (change.type === "modified") {
                    console.log("modified! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                }
                if (change.type === "removed") {
                    console.log("removed! ", "id: ", change.doc.id, "data.message: ", change.doc.data().message);
                    dispatchEvent( {event: 'message-remove', detail: {id: change.doc.id, message: change.doc.data(), path: change.doc.ref.path} } );
                }
            });
            console.log('---------------useChatFirebase---------------');
        });
        return unsubscribe;
    }//*********

    function sendMessage(roomId, messageContent, messageType='default', forwarded=false, citationId='', callback) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomMessages = db.collection('room-messages').doc(roomId).collection('messages').doc();
        const messageId = docRefRoomMessages.id;
        batch.set(docRefRoomMessages, {
            ...roomMessagesModel,
            userId: this.userId,
            name: this.userData.name,
            message: messageContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            forwarded,
            citationId
        });

        const docRefRoomMetadata = db.collection('room-metadata').doc(roomId);
        batch.update(docRefRoomMetadata, {
            lastActivity: firebase.firestore.FieldValue.serverTimestamp() // The time at which the room was created.
        });

        /*
        // ПРОИСХОДИТ ПОДПИСКА И ОТПИСКА НА ROOMS в UseEffect !!!!!!!!!! сравнивать массив rooms!?
        // И КУЧА РЕНДЕРОВ!!!
        const docRefUsers = db.collection('users').doc(this.userId);
        batch.update(docRefUsers, {
            lastActivity: firebase.firestore.FieldValue.serverTimestamp()
        });
        */

        return batch.commit()
            .then(function () {
                callback && callback(messageId);
                return messageId;
            });
    }//*********
    function updateMessage(roomId, messageId, data, callback) {
        return db.collection('room-messages').doc(roomId).collection('messages').doc(messageId).set({message: data}, {merge: true})
            .then( () => {
                callback && callback(messageId)
                return true;
            })
    }//*********
    function deleteMessage(roomId, messageId, callback) {
        return db.collection('room-messages').doc(roomId).collection('messages').doc(messageId).delete()
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
            ...roomMetadataModel,
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
    function getRoomMetadata(roomId) {
        return db.collection('room-metadata').doc(roomId).get().then( (doc) => doc.data() )
    }//*********
    async function getUserRoomsMetadata(userId) {
        const curUserId = userId || this.userId; //если нет "userId", то берем "this.userId"
        const curUserData = await getUserData(curUserId);

        if (!curUserData) return false;

        return db.collection("room-metadata")
            .where("id", "in", [...curUserData.rooms])
            .orderBy("lastActivity", "desc")
            .get()
            .then( querySnapshot => {
                    const roomsMetadata = [];
                    querySnapshot.forEach(doc => roomsMetadata.push({roomId: doc.id, data: doc.data()}) );
                    return roomsMetadata;
                }
            )
    }//*********
    function updateRoomMetadata(roomId, roomName, roomType, callback) {
        let newData = Object.assign({name: roomName}, roomType ? {type: roomType} : {});
        return db.collection('room-metadata').doc(roomId).set(newData, { merge: true })
            .then(function () {
                callback && callback(true);
                return true;
            });
    }//*********
    async function _deleteRoom(roomId, callback) {
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
        return db.collection("room-messages").doc(roomId).collection("messages")
            .orderBy("timestamp")
            .get()
            .then( querySnapshot => {
                let messages = [];
                querySnapshot.forEach(function(doc) {
                    messages.push({...doc.data(), id: doc.id});
                });
                return messages;
        });
    }//*********
    function getRoomMessage(roomId, messageId) {
        return db.collection("room-messages").doc(roomId).collection("messages").doc(messageId).get().then( doc => {
            if (doc.exists) {
                return ({...doc.data(), id: doc.id});
            }
            return false;
        });
    }//*********
    function enterRoom(roomId, callback) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomUsers = db.collection('room-users').doc(roomId).collection('users').doc(this.userId);
        batch.set(docRefRoomUsers, {id: this.userId});

        const docRefUsers = db.collection('users').doc(this.userId);
        batch.update(docRefUsers, {rooms: firebase.firestore.FieldValue.arrayUnion(roomId)});

        return batch.commit()
            .then( () => {
                dispatchEvent( { event: 'room-enter', detail: {roomId} } );
                callback && callback(true);
            });
    }//*********
    function leaveRoom(roomId, callback) {
        let batch = db.batch(); //выполняет multiple write operations as a single

        const docRefRoomUsers = db.collection('room-users').doc(roomId).collection('users').doc(this.userId);
        batch.delete(docRefRoomUsers);

        const docRefUsers = db.collection('users').doc(this.userId);
        batch.update(docRefUsers, {rooms: firebase.firestore.FieldValue.arrayRemove(roomId)});

        return batch.commit()
            .then( () => {
                dispatchEvent( { event: 'room-exit', detail: {roomId} } );
                callback && callback(true);
            });
    }//*********
    function getRoomUsers(roomId) {
        return db.collection('room-users').doc(roomId).collection('users').get().then( querySnapshot => {
            let users = [];
            querySnapshot.forEach(function(doc) {
                users.push({...doc.data(), id: doc.id});
            });
            return users;
        });
    }//*********

    function getUserData(userId) {
        const curUserId = userId || this.userId; //если нет "userId", то берем "this.userId"
        return db.collection('users').doc(curUserId).get().then( (doc) => doc.data() )
    }//*********this
    function getUserRef(userId) {
        const curUserId = userId || this.userId; //если нет "userId", то берем "this.userId"
        return db.collection('/users').doc(curUserId)
    }//*********this

    function addEventListener(event, callback) {
        /* смотри выше: const events = ['user-update', 'room-enter', 'room-exit', 'message-add', 'message-remove', 'room-invite', 'room-invite-response'];
        user-update - Invoked when the user's metadata changes.
        room-enter - Invoked when the user successfully enters a room.
        room-exit - Invoked when the user exists a room.
        message-add - Invoked when a new message is received.
        message-remove - Invoked when a message is deleted.
        room-invite - Invoked when a new room invite is received.
        room-invite-response - Invoked when a response to a previous invite is received.
        */
        if (!events.find( item => item === event ) ) return false; //нет такого события

        let eventListeners = chatEventListeners.current[event] || []; //извлекаем список callback-ов по переданному событию

        if ( eventListeners.find(item => item === callback) ) return true; //данный callback уже есть в списке

        eventListeners.push(callback);
        chatEventListeners.current[event] = eventListeners;
        return true;
    }//*********
    function removeEventListener(event, callback) {
        if (!events.find( item => item === event ) ) return false;

        let eventListeners = chatEventListeners.current[event];
        if (!eventListeners) return false; //нечего удалять

        chatEventListeners.current[event] = eventListeners.filter(item => item !== callback);

        if (!chatEventListeners.current[event].length) delete chatEventListeners.current[event];

        return true;
    }//*********
    function dispatchEvent(eventObj) {
        const {event} = eventObj;

        if (!events.find( item => item === event ) ) return false;

        let eventListeners = chatEventListeners.current[event] || [];

        eventListeners.forEach(callback => callback(eventObj));
        return true;
    }//*********

    function searchUserEmail(searchString) {
        let searchedArray = [];
        return db.collection('users').where("email","==", searchString)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    searchedArray.push({id: doc.id, data: doc.data()});
                });
                return searchedArray;
            })
    }//*********

    return {
        userId,
        userData,
        chatEventListeners,
        prevUserData,
        subscribersUserRooms,

        _createUser,
        updateUser,
        _deleteUser,

        _subscribeRoomMessages,

        sendMessage,
        updateMessage,
        deleteMessage,

        createRoom,
        getRoomMetadata,
        getUserRoomsMetadata,
        updateRoomMetadata,
        _deleteRoom,
        getRoomMessages,
        getRoomMessage,
        enterRoom,
        leaveRoom,
        getRoomUsers,

        getUserData,
        getUserRef,

        addEventListener,
        removeEventListener,
        dispatchEvent,

        searchUserEmail
    };
}