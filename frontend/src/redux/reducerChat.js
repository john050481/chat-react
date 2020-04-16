import {
    CREATE_MESSAGE,
    FETCH_MESSAGE,
    REQUEST_CHATID,
    FETCHED_CHATID,
    FETCHED_MESSAGES,
    FETCHED_CHATS
} from './types'

const init = {
    messages: [],
    chatId: null,
    chatInfo: null,
    chats: []
}

export default function (state = init, action) {
    switch (action.type) {
        case CREATE_MESSAGE:
            return {...state, messages: [...state.messages, ...action.payload]}
        case REQUEST_CHATID:
            return { ...state, chatId: action.payload }
        case FETCHED_CHATID:
            return { ...state, chatInfo: action.payload}
        case FETCHED_MESSAGES:
            return { ...state, messages: action.payload}
        case FETCHED_CHATS:
            return {...state, chats: action.payload}
        default:
            return state
    }
}