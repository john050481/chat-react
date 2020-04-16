import {
    SHOW_LAYOUT,
    CREATE_MESSAGE,
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
    REQUEST_CHATID,
    REQUEST_CHATS
} from './types'

let timerIdAlert = null;

export function createMessage(post) {
    return {
        type: CREATE_MESSAGE,
        payload: [post]
    }
}

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
