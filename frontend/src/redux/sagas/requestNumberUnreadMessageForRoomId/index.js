import {put, takeLatest, call} from 'redux-saga/effects'
import {REQUEST_NUMBER_UNREAD_MESSAGE_FOR_ROOMID, UPDATE_NUMBER_UNREAD_MESSAGE_FOR_ROOMID} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ROOM ID META---
export default function* sagaWatcher() {
    yield takeLatest(REQUEST_NUMBER_UNREAD_MESSAGE_FOR_ROOMID, sagaWorker);
}
function* sagaWorker(action) {
    const roomId = action.roomId;
    const chatDbApi = action.chatDbApi;
    const functionToGetNumberOfUnreadMessagesForRoom = () => chatDbApi.getNumberOfUnreadMessagesForRoom(roomId);

    try {
        yield put(showLoader())

        let numberUnreadMessages = yield call(functionToGetNumberOfUnreadMessagesForRoom);
        yield put({ type: UPDATE_NUMBER_UNREAD_MESSAGE_FOR_ROOMID, payload: {roomId, numberUnreadMessages} });

        yield put(hideLoader());
        //yield put(showAlert({text: 'FETCH UNREAD MESSAGE DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        console.error("SAGA/REQUEST_NUMBER_UNREAD_MESSAGE_FOR_ROOMID: ", e);
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
