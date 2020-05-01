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

    db.collection("chats").where("state", "==", "CA").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            console.dir(doc.data());
        });
    });

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
        db.collection("users").doc(user.email).set({...user})
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

    db.collection("users").doc("Chaim_McDermott@dana.io").get().then((querySnapshot) => {
        let user = querySnapshot.data();

        user.chats[0].get().then( querySnapshot => {
            let chat = querySnapshot.data();
            console.log(querySnapshot.id, chat);
        })

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
}

function Db(props) {
    const auth = useAuth()

    function handleClick(e) {
        console.log(props.chats);
        handlerDb(auth, props.chats)
    }
    function handleClick2(e) {
        console.log(props.chats);
        handlerDb2(auth, props.chats)
    }

    return (
        <>
            <button onClick={handleClick}>
                @@@@@@@@@@@@@@@@@@@
            </button>
            <button onClick={handleClick2}>
                ###################
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

export default connect(mapStateToProps, mapDispatchToProps)(Db)