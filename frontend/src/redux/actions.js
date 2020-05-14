import {
    SHOW_LAYOUT,

    SHOW_ALERT,
    HIDE_ALERT,

    SHOW_LOADER,
    HIDE_LOADER,

    USER_LOGIN,
    USER_LOGOUT,

    REQUEST_USERROOMS,
    REQUEST_ROOMID,

    CHAT_USER_ENTER,
    CHAT_USER_EXIT,

    CITATION_SET,
    CITATION_CLEAR
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
//___REQUEST_USERROOMS___
export function requestUserRoomsMetadata(functionGetUserRoomsMetadataForSaga) {
    return {
        type: REQUEST_USERROOMS,
        functionGetUserRoomsMetadataForSaga
    }
}
//___REQUEST_ROOMID___
export function requestRoom(roomId, functionGetRoomMetadataForSaga, functionGetRoomMessagesForSaga) {
    return {
        type: REQUEST_ROOMID,
        roomId,
        functionGetRoomMetadataForSaga,
        functionGetRoomMessagesForSaga
    }
}
//___CHAT_USER_ENTER___
export function chatUserEnter(user) {
    return {
        type: CHAT_USER_ENTER,
        payload: user
    }
}
export function chatUserExit() {
    return {
        type: CHAT_USER_EXIT,
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