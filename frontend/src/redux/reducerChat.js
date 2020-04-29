import {
    REQUEST_CHATID,
    FETCHED_CHATID,
    FETCHED_MESSAGES,
    FETCHED_CHATS
} from './types'

const init = {
    messages: [],
    chatInfo: null,
    chats: [],
    requestChatId: null
}

export default function (state = init, action) {
    switch (action.type) {
        case REQUEST_CHATID:
            return { ...state, requestChatId: action.payload, messages: [], chatInfo: null }
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