import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USERROOMS_UNREAD_MESSAGES, UPDATE_USERROOMS_UNREAD_MESSAGES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REQUEST_USERROOMS_UNREAD_MESSAGES---
export default function* sagaWatcher() {
    yield takeEvery(REQUEST_USERROOMS_UNREAD_MESSAGES, sagaWorker);
}
function* sagaWorker(action) {
    const chatDbApi = action.chatDbApi;
    const functionToGetNumberOfUnreadMessagesForAllRoom = () => chatDbApi.getNumberOfUnreadMessagesForAllRoom();

    try {
        yield put(showLoader())
        let roomsUnreadMessage = yield call(functionToGetNumberOfUnreadMessagesForAllRoom);
        yield put({ type: UPDATE_USERROOMS_UNREAD_MESSAGES, payload: roomsUnreadMessage });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOMS UNREAD MESSAGE DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
