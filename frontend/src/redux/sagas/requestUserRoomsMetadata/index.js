import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USERROOM, UPDATE_ROOMLIST} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcherRequestUserRoomsMetadata(...args) {
    console.log('########################### sagaWatcherRequestUserRoomsMetadata 111 === ', args);
    yield takeEvery(REQUEST_USERROOM, sagaWorkerRequestUserRoomsMetadata, ...args);
}
function* sagaWorkerRequestUserRoomsMetadata(...args) {
    console.log('########################### sagaWorkerRequestUserRoomsMetadata === 222 ', args);
    const url = `https://jsonplaceholder.typicode.com/users`;

    try {
        yield put(showLoader())
        let response = yield call(fetch, url);
        let chats = yield call(response.json.bind(response));
        yield put({ type: UPDATE_ROOMLIST, payload: chats });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CHATS DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
