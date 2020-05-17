import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USER_CONTACTS, UPDATE_USER_CONTACTS} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcherRequestUserContacts() {
    yield takeEvery(REQUEST_USER_CONTACTS, sagaWorkerRequestUserContacts);
}
function* sagaWorkerRequestUserContacts(action) {
    const functionGetUserContactsForSaga = action.functionGetUserContactsForSaga;

    try {
        yield put(showLoader())
        let contacts = yield call(functionGetUserContactsForSaga);
        yield put({ type: UPDATE_USER_CONTACTS, payload: contacts });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CONTACTS DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
