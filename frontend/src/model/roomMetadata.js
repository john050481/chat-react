/*
https://firechat.firebaseapp.com/docs/
on Firebase: room-metadata/<room-id>
*/

export default {
    createdAt: "", // The time at which the room was created. // firebase.firestore.FieldValue.serverTimestamp()
    createdByUserId: "", // The id of the user that created the room.
    id: "", // The id of the room.
    name: "", // The public display name of the room.
    type: "private" // The type of room, public or private.
}