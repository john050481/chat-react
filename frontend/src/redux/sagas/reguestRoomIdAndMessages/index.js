import {put, takeLatest, all, call} from 'redux-saga/effects'
import {REQUEST_ROOMID_AND_MESSAGES, FETCHED_CURRENT_ROOM, FETCHED_MESSAGES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcherRequestRoomIdAndMessages() {
    yield takeLatest(REQUEST_ROOMID_AND_MESSAGES, sagaWorkerRequestRoomIdAndMessages);
}
function* sagaWorkerRequestRoomIdAndMessages(action) {
    const roomId = action.roomId;
    const functionGetRoomMetadataForSaga = action.functionGetRoomMetadataForSaga;
    const functionGetRoomMessagesForSaga = action.functionGetRoomMessagesForSaga;

    try {
        yield put(showLoader())

        const { currentRoom, messages } = yield all({
            currentRoom: call(functionGetRoomMetadataForSaga),
            messages: call(functionGetRoomMessagesForSaga)
        });
        yield put({ type: FETCHED_CURRENT_ROOM, payload: currentRoom });
        yield put({ type: FETCHED_MESSAGES, payload: messages });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM & MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
