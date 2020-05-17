import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USERROOMS_METADATA, UPDATE_USERROOMS_METADATA} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcher() {
    yield takeEvery(REQUEST_USERROOMS_METADATA, sagaWorker);
}
function* sagaWorker(action) {
    const functionToGetDataForSaga = action.functionToGetDataForSaga;

    try {
        yield put(showLoader())
        let rooms = yield call(functionToGetDataForSaga);
        yield put({ type: UPDATE_USERROOMS_METADATA, payload: rooms });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOMS METADATA DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
