import {
    SHOW_LAYOUT,

    SHOW_ALERT,
    HIDE_ALERT,

    SHOW_LOADER,
    HIDE_LOADER,

    USER_LOGIN,
    USER_LOGOUT,

    REQUEST_USERROOMS_METADATA,
    REQUEST_ROOMID_MESSAGES,
    REQUEST_ROOMID_METADATA,

    CHAT_USER_UPDATE,
    CHAT_USER_EXIT,

    CITATION_SET,
    CITATION_CLEAR,

    ADD_NEW_MESSAGE_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_IN_CURRENT_CHAT,
    ADD_NEW_MESSAGE_IN_OTHER_CHAT,

    /*ENTER_ROOM,*/
    EXIT_ROOM,

    REQUEST_USER_CONTACTS
} from './types'

import changeFavicon from '../common/changeFavicon'

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
    changeFavicon('/favicon-new-message.ico');
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: {...props}
        })

        clearTimeout(timerIdAlert);
        timerIdAlert = setTimeout(() => {
            dispatch(hideAlert())
            changeFavicon('/favicon-default.ico');
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
export function requestRoomIdMessages(roomId, functionToGetDataForSaga) {
    return {
        type: REQUEST_ROOMID_MESSAGES,
        roomId,
        functionToGetDataForSaga
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
//___ADD_NEW_MESSAGE_IN_CURRENT_CHAT___
export function addNewMessageInCurrentChat(message) {
    return {
        type: ADD_NEW_MESSAGE_IN_CURRENT_CHAT,
        payload: message
    }
}
//___MODIFY_MESSAGE_IN_CURRENT_CHAT___
export function modifyMessageInCurrentChat(message) {
    return {
        type: MODIFY_MESSAGE_IN_CURRENT_CHAT,
        payload: message
    }
}
//___REMOVE_MESSAGE_IN_CURRENT_CHAT___
export function removeMessageInCurrentChat(message) {
    return {
        type: REMOVE_MESSAGE_IN_CURRENT_CHAT,
        payload: message
    }
}
//___ADD_NEW_MESSAGE_IN_OTHER_CHAT___
export function addNewMessageInOtherChat(roomId) {
    return {
        type: ADD_NEW_MESSAGE_IN_OTHER_CHAT,
        payload: roomId
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
        type: EXIT_ROOM
    }
}
//___REQUEST_USER_CONTACTS___
export function requestUserContacts(functionToGetDataForSaga) {
    return {
        type: REQUEST_USER_CONTACTS,
        functionToGetDataForSaga
    }
}
