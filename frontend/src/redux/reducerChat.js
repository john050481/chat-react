import {
    CHAT_USER_UPDATE,
    CHAT_USER_EXIT,

    REQUEST_USERROOMS_METADATA,
    UPDATE_USERROOMS_METADATA,

    /*REQUEST_ROOMID_METADATA,*/
    UPDATE_ROOMID_METADATA,

    UPDATE_GET_NEXT_MESSAGES_AND_STATUSES,

    REQUEST_ROOMID_MESSAGES,
    UPDATE_ROOMID_MESSAGES,
    UPDATE_ROOMID_MESSAGES_STATUSES,

    ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED,

    CITATION_SET,
    CITATION_CLEAR,

    ADD_NEW_MESSAGE_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_IN_CURRENT_CHAT,
//    ADD_NEW_MESSAGE_IN_OTHER_CHAT,
//    MODIFY_MESSAGE_IN_OTHER_CHAT,
//    REMOVE_MESSAGE_IN_OTHER_CHAT,

    ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT,
//    ADD_NEW_MESSAGE_STATUS_IN_OTHER_CHAT,
//    MODIFY_MESSAGE_STATUS_IN_OTHER_CHAT,
//    REMOVE_MESSAGE_STATUS_IN_OTHER_CHAT,
    UPDATE_NUMBER_UNREAD_MESSAGE_FOR_ROOMID,

    UPDATE_USERROOMS_UNREAD_MESSAGES,

    /*ENTER_ROOM*/
    EXIT_ROOM,

    REQUEST_USER_CONTACTS,
    UPDATE_USER_CONTACTS
} from './types'

const init = {
    user: null,
    messages: [],
    statuses: [],
    rooms: [],
    roomsUnreadMessage: [],
    contacts: [],

    requestRoomId: null,
    currentRoomId: null,

    citation: {
        id: '',
        text: '',
        author: ''
    },

    getNextMessagesAndStatuses: null
}

export default function (state = init, action) {
    switch (action.type) {
        case CHAT_USER_UPDATE:
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
            return {
                ...state,
                rooms: [action.payload, ...state.rooms.filter( room => room.roomId !== action.payload.roomId)]
                    .sort( (roomA, roomB) => roomB.data.lastActivity?.seconds - roomA.data.lastActivity?.seconds )
            }

        case UPDATE_GET_NEXT_MESSAGES_AND_STATUSES:
            return { ...state, getNextMessagesAndStatuses: action.payload}

        case REQUEST_ROOMID_MESSAGES:
            if (action.isFirstRequest) {
                return { ...state, requestRoomId: action.roomId, messages: [], statuses: [], currentRoomId: null, citation: {id: '', text: '', author: ''}, getNextMessagesAndStatuses: null }
            } else {
                return { ...state }
            }
        case UPDATE_ROOMID_MESSAGES:
            return { ...state, messages: [...action.payload, ...state.messages]}
        case UPDATE_ROOMID_MESSAGES_STATUSES:
            return { ...state, statuses: [...action.payload, ...state.statuses]}

        case ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED:
            return { ...state, currentRoomId: action.payload}

        case CITATION_SET:
            return { ...state, citation: {id: action.id, text: action.text, author: action.author} }
        case CITATION_CLEAR:
            return { ...state, citation: {id: '', text: '', author: ''} }

        case ADD_NEW_MESSAGE_IN_CURRENT_CHAT:
            return { ...state, messages: [...state.messages, action.payload]}
        case MODIFY_MESSAGE_IN_CURRENT_CHAT:
            return { ...state, messages: state.messages.map( message => message.id !== action.payload.id ? message : action.payload ) }
        case REMOVE_MESSAGE_IN_CURRENT_CHAT:
            return { ...state, messages: [...state.messages.filter( message => message.id !== action.payload.id)]}

        case ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT:
            return { ...state, statuses: [...state.statuses, action.payload]}
        case MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT:
            return { ...state, statuses: state.statuses.map( status => status.id !== action.payload.id ? status : action.payload ) }
        case REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT:
            return { ...state, statuses: [...state.statuses.filter( status => status.id !== action.payload.id)]}

        case UPDATE_NUMBER_UNREAD_MESSAGE_FOR_ROOMID:
            return { ...state, roomsUnreadMessage: state.roomsUnreadMessage.map( unreadMessage => unreadMessage.roomId !== action.payload.roomId ? unreadMessage : action.payload )}

        case UPDATE_USERROOMS_UNREAD_MESSAGES:
            return { ...state, roomsUnreadMessage: action.payload }

        /*
        case ENTER_ROOM:
            return {...state}
        */
        case EXIT_ROOM:
            if (action.payload === state.currentRoomId) // если выход из активной комнаты
                return {...state, requestRoomId: null, currentRoomId: null, messages: [], statuses: [], getNextMessagesAndStatuses: null}
            return state; // если из НЕ активной

        case REQUEST_USER_CONTACTS:
            return {...state, contacts: []}
        case UPDATE_USER_CONTACTS:
            return {...state, contacts: action.payload}

        default:
            return state
    }
}