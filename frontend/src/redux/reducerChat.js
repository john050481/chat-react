import {
    CHAT_USER_ENTER,
    CHAT_USER_EXIT,

    REQUEST_USERROOMS_METADATA,
    UPDATE_USERROOMS_METADATA,

    /*REQUEST_ROOMID_METADATA,*/
    UPDATE_ROOMID_METADATA,

    REQUEST_ROOMID_MESSAGES,
    UPDATE_ROOMID_MESSAGES,

    ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED,

    CITATION_SET,
    CITATION_CLEAR,

    ADD_NEW_MESSAGE_IN_CURRENT_CHAT,

    /*ENTER_ROOM*/
    EXIT_ROOM,

    REQUEST_USER_CONTACTS,
    UPDATE_USER_CONTACTS
} from './types'

const init = {
    user: null,
    messages: [],
    rooms: [],
    contacts: [],

    requestRoomId: null,
    currentRoomId: null,

    citation: {
        id: '',
        text: '',
        author: ''
    }
}

export default function (state = init, action) {
    switch (action.type) {
        case CHAT_USER_ENTER:
            return { ...state, user: action.payload}
        case CHAT_USER_EXIT:
            return { ...state, user: null}

        case REQUEST_USERROOMS_METADATA:
            return {...state, rooms: []}
        case UPDATE_USERROOMS_METADATA:
            return {...state, rooms: action.payload}

        /*
        case REQUEST_ROOMID_METADATA:
            return ...
        */
        case UPDATE_ROOMID_METADATA:
            return {...state, rooms: [action.payload, ...state.rooms.filter( room => room.roomId !== action.payload.roomId)]}

        case REQUEST_ROOMID_MESSAGES:
            return { ...state, requestRoomId: action.roomId, messages: [], currentRoomId: null, citation: {id: '', text: '', author: ''} }
        case UPDATE_ROOMID_MESSAGES:
            return { ...state, messages: action.payload}

        case ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED:
            return { ...state, currentRoomId: action.payload}

        case CITATION_SET:
            return { ...state, citation: {id: action.id, text: action.text, author: action.author} }
        case CITATION_CLEAR:
            return { ...state, citation: {id: '', text: '', author: ''} }

        case ADD_NEW_MESSAGE_IN_CURRENT_CHAT:
            return { ...state, messages: [...state.messages, action.payload]}

        /*
        case ENTER_ROOM:
            return {...state}
        */
        case EXIT_ROOM:
            return {...state, requestRoomId: null, currentRoomId: null, messages: []}

        case REQUEST_USER_CONTACTS:
            return {...state, contacts: []}
        case UPDATE_USER_CONTACTS:
            return {...state, contacts: action.payload}

        default:
            return state
    }
}