import {put, takeLatest, all, call} from 'redux-saga/effects'
import {REQUEST_ROOMID_MESSAGES, ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, UPDATE_ROOMID_MESSAGES, UPDATE_ROOMID_MESSAGES_STATUSES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcher() {
    yield takeLatest(REQUEST_ROOMID_MESSAGES, sagaWorker);
}
function* sagaWorker(action) {
    const roomId = action.roomId;
    const chatDbApi = action.chatDbApi;
    const functionToGetMessages = () => chatDbApi.getRoomMessages(roomId);
    const functionToGetStatuses = () => chatDbApi.getRoomMessagesStatuses(roomId);

    try {
        yield put(showLoader())

        const { messages, statuses } = yield all({
            messages: call(functionToGetMessages),
            statuses: call(functionToGetStatuses)
        });
        yield put({ type: ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, payload: roomId });
        yield put({ type: UPDATE_ROOMID_MESSAGES, payload: messages });
        yield put({ type: UPDATE_ROOMID_MESSAGES_STATUSES, payload: statuses });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM & MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
