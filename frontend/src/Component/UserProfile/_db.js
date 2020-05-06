import React from 'react'
import {useAuth} from "../../hooks/useAuth";
import {connect} from "react-redux";

let unsubscribe;

function handlerDb(auth, users) {
    const db = auth.firebase.firestore();
    console.log(auth);

    if (unsubscribe) unsubscribe();
    unsubscribe = db.collection("chats").where("state", "==", "CA")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                }
            });
        });

    db.collection("chats").where("state", "==", "CA").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id);
                console.dir(doc.data());
            });
        })
        .catch(e => console.log(e));

    // Add a new document in collection "chats"
    db.collection("chats").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    }, { merge: true })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });


    // Add a new document in collection "users"
    users.forEach( user => {
        /*db.collection("users").doc(user.email).set({...user}, { merge: true })*/
        db.collection("users").doc().set({...user}, { merge: true })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    })
}

function handlerDb2(auth, users) {
    const db = auth.firebase.firestore();
    console.log(auth);

    db.collection("users").where("email","==","example@example.ru").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let user = doc.data();
                console.log('user email === ', doc.id, user.email, user.chats);

                user.chats[0].get().then( querySnapshot => {
                    let chat = querySnapshot.data();
                    console.log(querySnapshot.id, chat);
                })

                // https://firebase.google.com/docs/firestore/data-model
                // var messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');
                user.chats[0].collection("messages").get().then( querySnapshot => {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        doc.data().from.get().then(querySnapshot => {
                            console.log(querySnapshot.data())
                        })
                    });
                })
            });
        })
        .catch(e => console.log(e));
}

function handlerDb3(auth) {
    const db = auth.firebase.firestore();
    var batch = db.batch();
    console.log(auth);

    db.collection("users").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc);
                doc.ref.delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });

            });
        })
        .catch(e => console.log(e));
}

function _db(props) {
    const auth = useAuth()

    function handleClick(e) {
        handlerDb(auth, props.chats)
    }
    function handleClick2(e) {
        handlerDb2(auth, props.chats)
    }
    function handleClick3(e) {
        handlerDb3(auth)
    }

    return (
        <>
            <button onClick={handleClick}>
                Test DB 1
            </button>
            <button onClick={handleClick2}>
                Test DB 2
            </button>
            <button onClick={handleClick3}>
                Delete Users
            </button>
        </>
    )
}

const mapStateToProps = store => {
    return {
        chats: store.chat.chats
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(_db)