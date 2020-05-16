import {put, takeLatest, all, call} from 'redux-saga/effects'
import {REQUEST_ROOMID_MESSAGES, ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, UPDATE_ROOMID_MESSAGES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcherRequestRoomIdAndMessages() {
    yield takeLatest(REQUEST_ROOMID_MESSAGES, sagaWorkerRequestRoomIdAndMessages);
}
function* sagaWorkerRequestRoomIdAndMessages(action) {
    const roomId = action.roomId;
    const functionGetRoomMessagesForSaga = action.functionGetRoomMessagesForSaga;

    try {
        yield put(showLoader())

        const { currentRoom, messages } = yield all({
            messages: call(functionGetRoomMessagesForSaga)
        });
        yield put({ type: ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, payload: roomId });
        yield put({ type: UPDATE_ROOMID_MESSAGES, payload: messages });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM & MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
