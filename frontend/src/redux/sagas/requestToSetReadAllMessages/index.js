import {put, takeLatest, call, select} from 'redux-saga/effects'
import {REQUEST_READ_ALL_MESSAGES, SET_READ_ALL_MESSAGES} from '../../types';
import {showAlert} from '../../actions';

//---REGUEST ROOM ID META---
export default function* sagaWatcher() {
    yield takeLatest(REQUEST_READ_ALL_MESSAGES, sagaWorker);
}
function* sagaWorker(action) {
    const roomId = action.roomId;
    const chatDbApi = action.chatDbApi;
    const callback = action.callback;
    const functionToSetAllMessageRead = () => chatDbApi.setAllMessageRead(roomId);

    try {
        const statuses = yield select( store => store.chat.statuses );

        let isUnreadMessage = false;
        statuses.forEach( statusMessage => {
            if ( statusMessage.usersWhoNotRead.includes(chatDbApi.userId) ) {
                isUnreadMessage = true;
                return;
            }
        } );
        if (isUnreadMessage)
            yield call(functionToSetAllMessageRead);

        callback && callback();
    } catch(e) {
        console.error("SAGA/REQUEST_READ_ALL_MESSAGES: ", e);
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
