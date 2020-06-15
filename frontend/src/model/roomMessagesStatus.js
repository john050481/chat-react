/*
https://firechat.firebaseapp.com/docs/
on Firebase: room-messages/<room-id>/<statuses>/<message-id>
*/
export default {
    usersWhoRead: [],
    usersWhoNotRead: [],
    timestamp: "" // The time at which the message was sent. // firebase.firestore.FieldValue.serverTimestamp()
}