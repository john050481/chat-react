import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_CHATS, FETCHED_CHATS} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL CHATS---
export default function* sagaWatcherRequestChats() {
    yield takeEvery(REQUEST_CHATS, sagaWorkerRequestChats);
}
function* sagaWorkerRequestChats() {
    const url = `https://jsonplaceholder.typicode.com/users`;

    try {
        yield put(showLoader())
        let response = yield call(fetch, url);
        let chats = yield call(response.json.bind(response));
        yield put({ type: FETCHED_CHATS, payload: chats });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CHATS DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
