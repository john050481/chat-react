import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USERROOMS, UPDATE_ROOMLIST} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcherRequestUserRoomsMetadata() {
    yield takeEvery(REQUEST_USERROOMS, sagaWorkerRequestUserRoomsMetadata);
}
function* sagaWorkerRequestUserRoomsMetadata(action) {
    const functionGetUserRoomsMetadataForSaga = action.functionGetUserRoomsMetadataForSaga;

    try {
        yield put(showLoader())
        let rooms = yield call(functionGetUserRoomsMetadataForSaga);
        yield put({ type: UPDATE_ROOMLIST, payload: rooms });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOMS METADATA DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
