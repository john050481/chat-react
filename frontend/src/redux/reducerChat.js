import {
    FETCHED_MESSAGES,

    CHAT_USER_ENTER,
    CHAT_USER_EXIT,
    UPDATE_ROOMLIST,
    REQUEST_ROOMID,
    FETCHED_ROOMID,

    CITATION_SET,
    CITATION_CLEAR
} from './types'

const init = {
    user: null,
    messages: [],
    rooms: [],
    requestRoomId: null,
    currentRoom: null,

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

        case FETCHED_MESSAGES:
            return { ...state, messages: action.payload}
        case UPDATE_ROOMLIST:
            return {...state, rooms: action.payload}
        case REQUEST_ROOMID:
            return { ...state, requestRoomId: action.roomId, messages: [], currentRoom: null, citation: {id: '', text: '', author: ''} }
        case FETCHED_ROOMID:
            return { ...state, currentRoom: action.payload}

        case CITATION_SET:
            return { ...state, citation: {id: action.id, text: action.text, author: action.author} }
        case CITATION_CLEAR:
            return { ...state, citation: {id: '', text: '', author: ''} }

        default:
            return state
    }
}