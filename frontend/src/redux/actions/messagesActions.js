import {
    ADD_NEW_MESSAGE_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_IN_CURRENT_CHAT,

    ADD_NEW_MESSAGE_IN_OTHER_CHAT,
    //MODIFY_MESSAGE_IN_OTHER_CHAT,
    //REMOVE_MESSAGE_IN_OTHER_CHAT
} from '../types'

/*
###############################
### MESSAGE_IN_CURRENT_CHAT ###
###############################
*/
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
/*
###############################
#### MESSAGE_IN_OTHER_CHAT ####
###############################
*/
//___ADD_NEW_MESSAGE_IN_OTHER_CHAT___
export function addNewMessageInOtherChat(roomId) {
    return {
        type: ADD_NEW_MESSAGE_IN_OTHER_CHAT,
        payload: roomId
    }
}