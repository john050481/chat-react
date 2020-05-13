import {put, takeLatest, all, call} from 'redux-saga/effects'
import {REQUEST_ROOMID, FETCHED_ROOMID, FETCHED_MESSAGES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcherRequestRoomId() {
    yield takeLatest(REQUEST_ROOMID, sagaWorkerRequestRoomId);
}
function* sagaWorkerRequestRoomId(action) {
    const roomId = action.roomId;
    const functionGetRoomMetadataForSaga = action.functionGetRoomMetadataForSaga;
    const functionGetRoomMessagesForSaga = action.functionGetRoomMessagesForSaga;

    try {
        yield put(showLoader())

        const { currentRoom, messages } = yield all({
            currentRoom: call(functionGetRoomMetadataForSaga),
            messages: call(functionGetRoomMessagesForSaga)
        });
        yield put({ type: FETCHED_ROOMID, payload: currentRoom });
        yield put({ type: FETCHED_MESSAGES, payload: messages });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM & MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
