import {
    SHOW_LAYOUT,

    SHOW_ALERT,
    HIDE_ALERT,

    SHOW_LOADER,
    HIDE_LOADER,

    VISIBILITY_CHANGE,

    USER_LOGIN,
    USER_LOGOUT,

    REQUEST_USERROOMS_METADATA,
    REQUEST_ROOMID_MESSAGES,
    REQUEST_ROOMID_METADATA,

    CHAT_USER_UPDATE,
    CHAT_USER_EXIT,

    CITATION_SET,
    CITATION_CLEAR,

    REQUEST_USERROOMS_UNREAD_MESSAGES,

    /*ENTER_ROOM,*/
    EXIT_ROOM,

    REQUEST_USER_CONTACTS
} from '../types'

import changeFavicon from "../../common/changeFavicon";

let timerIdAlert = null;

//___LAYOUT___
export function showLayout(layout) {
    return {
        type: SHOW_LAYOUT,
        payload: layout
    }
}
//___LOADER___
export function showLoader(props = {options: {}}) {
    return {
        type: SHOW_LOADER,
        payload: {...props}
    }
}
export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}
//___ALERT___
export function showAlert(props = {text: '', options: {}}) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: {...props}
        })

        clearTimeout(timerIdAlert);
        timerIdAlert = setTimeout(() => {
            dispatch(hideAlert())
        }, 10000)
    }
}
export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}
//___USER_AUTH___
export function userLogin(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}
export function userLogout() {
    return {
        type: USER_LOGOUT,
    }
}
//___VISIBILITY_CHANGE___
export function visibilityChange(visible) {
    if (visible)
        changeFavicon('/favicon-default.ico');

    return {
        type: VISIBILITY_CHANGE,
        payload: visible
    }
}
//___CHAT_USER_UPDATE___
export function chatUserUpdate(user) {
    return {
        type: CHAT_USER_UPDATE,
        payload: user
    }
}
export function chatUserExit() {
    return {
        type: CHAT_USER_EXIT,
    }
}
//___REQUEST_USERROOMS_METADATA___
export function requestUserRoomsMetadata(functionToGetDataForSaga) {
    return {
        type: REQUEST_USERROOMS_METADATA,
        functionToGetDataForSaga
    }
}
//___REQUEST_ROOMID_METADATA___
export function requestUpdateRoomMetadata(roomId, functionToGetDataForSaga) {
    return {
        type: REQUEST_ROOMID_METADATA,
        roomId,
        functionToGetDataForSaga
    }
}
//___REQUEST_ROOMID_MESSAGES___
export function requestRoomIdMessages(roomId, chatDbApi) {
    return {
        type: REQUEST_ROOMID_MESSAGES,
        roomId,
        chatDbApi
    }
}
//___CITATION___
export function setCitation(id, text, author) {
    return {
        type: CITATION_SET,
        id,
        text,
        author
    }
}
export function clearCitation() {
    return {
        type: CITATION_CLEAR
    }
}
//___REQUEST_USERROOMS_UNREAD_MESSAGES___
export function requestUserRoomsUnreadMessage(chatDbApi) {
    return {
        type: REQUEST_USERROOMS_UNREAD_MESSAGES,
        chatDbApi
    }
}
//___ENTER_ROOM___
/*
export function enterRoom(roomId) {
}
*/
//___EXIT_ROOM___
export function exitRoom(roomId) {
    return {
        type: EXIT_ROOM,
        payload: roomId
    }
}
//___REQUEST_USER_CONTACTS___
export function requestUserContacts(functionToGetDataForSaga) {
    return {
        type: REQUEST_USER_CONTACTS,
        functionToGetDataForSaga
    }
}
