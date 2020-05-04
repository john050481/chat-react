// Hook (useChatDb.js)
import React, { useState, useEffect } from "react";
import {useAuth} from "./useAuth";
import userModel from '../model/user';

export function useChatDb() {
    const auth = useAuth();
    const db = auth.firebase.firestore();
    const [user, setUser] = useState(null);
    const [subscribersChat, setSubscribersChat] = useState([]);

    useEffect(
        () => {
            if (!auth.user) return;

            let unsubscribeUser = db.collection("users").where("email", "==", auth.user.email)
                .onSnapshot(function(querySnapshot) {

                    querySnapshot.docChanges().forEach(function(change) {
                        if (change.type === "added") {
                            console.log("added: ", change.doc.data());
                        }
                        if (change.type === "modified") {
                            console.log("modified: ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            console.log("removed: ", change.doc.data());
                        }
                    });

                    if (querySnapshot.empty) {
                        createUser(auth.user.email);
                        return;
                    }

                    querySnapshot.forEach(function(documentUser) {
                        setUser(documentUser.ref);

                        unsubscribeAllChat();
                        documentUser.data().chats.forEach( chat => {
                            subscribeChat(chat);
                        })

                        return; //return only first user
                    });
                });

            return () => {
                unsubscribeUser();
                unsubscribeAllChat();
            };
        },
        [auth]
    );

    function createUser(email) {
        return db.collection("users").add({ ...userModel, email })
            .then(function(docRef) {
                setUser(docRef);
                return docRef;
            })
    }
    function updateUser(data) {
        return this.user.set({...data}, { merge: true })
    }
    function deleteUser() {
        return this.user.delete().then(function() {
            setUser(null);
            return true;
        })
    }

    function subscribeChat(chatRef) {
        let unsubscribe = chatRef.collection("messages").onSnapshot(function (snapshot){
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
        setSubscribersChat( prev => [...prev, {id: chatRef.id, chatRef, unsubscribe}] );
    }
    function unsubscribeChat(chatRef) {
        const unsubscribe = subscribersChat.find( item => item.id == chatRef.id);
        unsubscribe.unsubscribe();
        setSubscribersChat( prev => prev.filter( item => item.id != chatRef.id) );
    }
    function unsubscribeAllChat() {
        subscribersChat.forEach( item => item.unsubscribe() );
        setSubscribersChat( []);
    }

    function sendMessage() {}
    function updateMessage() {}
    function deleteMessage() {}

    function createChat() {}
    function updateChat(chatRef, data) {
        return chatRef.set({...data}, { merge: true })
    }
    async function deleteChat(chatRef) {
        await chatRef.collection("messages").get().then( querySnapshot => {
            querySnapshot.forEach( doc => doc.ref.delete().then(() => true) )
        } );
        return chatRef.delete().then(() => true)
    }
    function getChatMessages(chatRef) {
        return chatRef.collection("messages").get().then( querySnapshot => {
            let messages = [];
            querySnapshot.forEach(function(doc) {
                messages.push(doc.data());
            });
            return messages;
        });
    }
    function addChatInUserProfile() {}
    async function deleteChatFromUserProfile(chatRef) {
        let userData = await this.user.get().then( querySnapshot => querySnapshot.data() );
        let filteredChats = userData.chats.filter( item => item.id !== chatRef.id);
        updateUser.call({user}, {chats: filteredChats});
        unsubscribeChat(chatRef);
    }

    function getUserData(userRef) {
        return userRef.get().then( querySnapshot => querySnapshot.data() )
    }

    return {
        user,
        subscribersChat, /////////////////////////////
        createUser,
        updateUser,
        deleteUser,
        subscribeChat,
        unsubscribeChat,
        unsubscribeAllChat,
        sendMessage,
        updateMessage,
        deleteMessage,
        createChat,
        updateChat,
        deleteChat,
        getChatMessages,
        addChatInUserProfile,
        deleteChatFromUserProfile,
        getUserData
    };
}