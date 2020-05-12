import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_CHATS, FETCHED_CHATS} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL CHATS---
export default function* sagaWatcherRequestChats(...args) {
    console.log('########################### sagaWorkerRequestChats 111 === ', args);
    yield takeEvery(REQUEST_CHATS, sagaWorkerRequestChats, ...args);
}
function* sagaWorkerRequestChats(...args) {
    console.log('########################### sagaWorkerRequestChats === 222 ', args);
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
