import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USER_CONTACTS, UPDATE_USER_CONTACTS} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcher() {
    yield takeEvery(REQUEST_USER_CONTACTS, sagaWorker);
}
function* sagaWorker(action) {
    const functionToGetDataForSaga = action.functionToGetDataForSaga;

    try {
        yield put(showLoader())
        let contacts = yield call(functionToGetDataForSaga);
        yield put({ type: UPDATE_USER_CONTACTS, payload: contacts });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CONTACTS DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
