import {
    SHOW_LAYOUT,
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
    REQUEST_CHATID,
    REQUEST_CHATS,
    USER_LOGIN,
    USER_LOGOUT
} from './types'

let timerIdAlert = null;

//___REQUEST_CHATS/CONTACTS_ALL___
export function requestChats() {
    return {
        type: REQUEST_CHATS
    }
}

//___REQUEST_CHAT___
export function requestChat(id) {
    return {
        type: REQUEST_CHATID,
        payload: id
    }
}

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
