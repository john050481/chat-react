import {put, takeLatest, call} from 'redux-saga/effects'
import {REQUEST_ROOMID_METADATA, UPDATE_ROOMID_METADATA} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ROOM ID META---
export default function* sagaWatcher() {
    yield takeLatest(REQUEST_ROOMID_METADATA, sagaWorker);
}
function* sagaWorker(action) {
    const roomId = action.roomId;
    const functionToGetDataForSaga = action.functionToGetDataForSaga;

    try {
        yield put(showLoader())

        let roomMetadata = yield call(functionToGetDataForSaga);
        yield put({ type: UPDATE_ROOMID_METADATA, payload: {roomId, data: roomMetadata} });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH ROOM META DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
