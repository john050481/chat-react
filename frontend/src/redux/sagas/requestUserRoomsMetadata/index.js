import {put, takeEvery, call} from 'redux-saga/effects'
import {REQUEST_USERROOMS_METADATA, UPDATE_USERROOMS_METADATA} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ALL ROOMS METADATA---
export default function* sagaWatcherRequestUserRoomsMetadata() {
    yield takeEvery(REQUEST_USERROOMS_METADATA, sagaWorkerRequestUserRoomsMetadata);
}
function* sagaWorkerRequestUserRoomsMetadata(action) {
    const functionGetUserRoomsMetadataForSaga = action.functionGetUserRoomsMetadataForSaga;

    try {
        yield put(showLoader())
        let rooms = yield call(functionGetUserRoomsMetadataForSaga);
        yield put({ type: UPDATE_USERROOMS_METADATA, payload: rooms });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOMS METADATA DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}
