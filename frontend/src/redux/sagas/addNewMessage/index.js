import {select, takeLatest} from 'redux-saga/effects'
import {ADD_NEW_MESSAGE_IN_CURRENT_CHAT, ADD_NEW_MESSAGE_IN_OTHER_CHAT} from '../../types';

import changeFavicon from '../../../common/changeFavicon'
import playAudioAddMessage from '../../../common/playAudioAddMessage'

/* USAGE:
    changeFavicon('/favicon-new-message.ico');
    changeFavicon('/favicon-default.ico');

    playAudioAddMessage.play().catch();
*/

//---ADD New Message---
export default function* sagaWatcherAddMessage() {
    yield takeLatest([ADD_NEW_MESSAGE_IN_CURRENT_CHAT, ADD_NEW_MESSAGE_IN_OTHER_CHAT], sagaWorkerAddMessage);
}

function* sagaWorkerAddMessage(action) {
    const type = action.type;

    const mutedArr = yield select( store => store.chat.user.userData.muted );

    let curRoomId = "";
    if (type === ADD_NEW_MESSAGE_IN_CURRENT_CHAT) {// action.payload -  это "message"
        curRoomId = yield select( state => state.chat.currentRoomId );
    } else if (type === ADD_NEW_MESSAGE_IN_OTHER_CHAT) {// action.payload - это "roomId"
        curRoomId = action.payload;
    }

    const roomIsMuted = mutedArr.includes(curRoomId);
    if (!roomIsMuted) {
        playAudioAddMessage.play().catch();
    }

    changeFavicon('/favicon-new-message.ico');
}
