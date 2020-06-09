import {
    ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT,

    ADD_NEW_MESSAGE_STATUS_IN_OTHER_CHAT,
    //MODIFY_MESSAGE_STATUS_IN_OTHER_CHAT,
    //REMOVE_MESSAGE_STATUS_IN_OTHER_CHAT
} from '../types';

/*
###############################
### MESSAGE_IN_CURRENT_CHAT ###
###############################
*/
//___ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT___
export function addNewMessageStatusInCurrentChat(messageStatus) {
    return {
        type: ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT,
        payload: messageStatus
    }
}
//___MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT___
export function modifyMessageStatusInCurrentChat(messageStatus) {
    return {
        type: MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT,
        payload: messageStatus
    }
}
//___REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT___
export function removeMessageStatusInCurrentChat(messageStatus) {
    return {
        type: REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT,
        payload: messageStatus
    }
}
/*
###############################
#### MESSAGE_IN_OTHER_CHAT ####
###############################
*/
//___ADD_NEW_MESSAGE_STATUS_IN_OTHER_CHAT___
export function addNewMessageStatusInOtherChat(roomId) {
    return {
        type: ADD_NEW_MESSAGE_STATUS_IN_OTHER_CHAT,
        payload: roomId
    }
}
