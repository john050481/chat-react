import {put, takeLatest, call} from 'redux-saga/effects'
import {REQUEST_ROOMID_METADATA, UPDATE_ROOMID_METADATA} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ROOM ID META---
export default function* sagaWatcherRequestUpdateRoomIdMetadata() {
    yield takeLatest(REQUEST_ROOMID_METADATA, sagaWorkerRequestUpdateRoomIdMetadata);
}
function* sagaWorkerRequestUpdateRoomIdMetadata(action) {
    const roomId = action.roomId;
    const functionGetRoomMetadataForSaga = action.functionGetRoomMetadataForSaga;

    try {
        yield put(showLoader())

        let roomMetadata = yield call(functionGetRoomMetadataForSaga);
        yield put({ type: UPDATE_ROOMID_METADATA, payload: {roomId, data: roomMetadata} });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM META DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
