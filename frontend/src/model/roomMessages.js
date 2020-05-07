/*
https://firechat.firebaseapp.com/docs/
on Firebase: room-messages/<room-id>/<message-id>
*/
export default {
    userId: "", // The id of the user that sent the message.
    name: "", // The name of the user that sent the message.
    message: "", // The content of the message.
    timestamp: "", // The time at which the message was sent. // firebase.firestore.FieldValue.serverTimestamp()
    forwarded: false, // пересланное сообщение или нет
    citationId: "" // id процитированного сообщения, если есть
}