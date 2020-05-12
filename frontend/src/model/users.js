/*
https://firechat.firebaseapp.com/docs/
on Firebase: users/<user-id>
*/
export default {
    id: "", // The id of the user.
    name: "", // The display name of the user.
    invites: [], // A list of invites the user has received.
    muted: [], //  list of user ids currently muted by the user.
    rooms: [], // A list of currently active rooms, used for sessioning.

    contacts: [], // Array of users ID

    lastActivity: "", // The time at last activity. // firebase.firestore.FieldValue.serverTimestamp()

    username: "", //"Bret",
    email: "", //"Sincere@april.biz",
    phone: "", //"1-770-736-8031 x56442",
    website: "", //"hildegard.org",
    address: {
        street: "", //"Kulas Light",
        suite: "", //"Apt. 556",
        city: "", //"Gwenborough",
        zipcode: "", //"92998-3874",
        geo: {
            lat: "", //"-37.3159",
            lng: "", //"81.1496"
        }
    },
    company: {
        name: "", //"Romaguera-Crona",
        catchPhrase: "", //"Multi-layered client-server neural-net",
        bs: "", //"harness real-time e-markets"
    }
}