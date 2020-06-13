import {
    ADD_NEW_MESSAGE_STATUS_IN_CURRENT_CHAT,
    MODIFY_MESSAGE_STATUS_IN_CURRENT_CHAT,
    REMOVE_MESSAGE_STATUS_IN_CURRENT_CHAT,

    //ADD_NEW_MESSAGE_STATUS_IN_OTHER_CHAT,
    //MODIFY_MESSAGE_STATUS_IN_OTHER_CHAT,
    //REMOVE_MESSAGE_STATUS_IN_OTHER_CHAT

    REQUEST_NUMBER_UNREAD_MESSAGE_FOR_ROOMID,

    REQUEST_READ_ALL_MESSAGES
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
##########################################
#### UPDATE UNREAD MESSAGE FOR ROOMID ####
##########################################
*/
export function requestNumberUnreadMessageForRoomId(roomId, chatDbApi) {
    return {
        type: REQUEST_NUMBER_UNREAD_MESSAGE_FOR_ROOMID,
        roomId,
        chatDbApi
    }
}
/*
##########################################
########## SET READ ALL MESSAGE ##########
##########################################
*/
export function requestToSetReadAllMessages(roomId, chatDbApi) {
    return {
        type: REQUEST_READ_ALL_MESSAGES,
        roomId,
        chatDbApi
    }
}