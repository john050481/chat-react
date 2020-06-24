import {put, takeLeading, all, call, select} from 'redux-saga/effects'
import {REQUEST_ROOMID_MESSAGES, ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, UPDATE_ROOMID_MESSAGES, UPDATE_ROOMID_MESSAGES_STATUSES, UPDATE_GET_NEXT_MESSAGES_AND_STATUSES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcher() {
    yield takeLeading(REQUEST_ROOMID_MESSAGES, sagaWorker);
}
function* sagaWorker(action) {
    const roomId = action.roomId;
    const chatDbApi = action.chatDbApi;
    const isFirstRequest = action.isFirstRequest;

    try {
        yield put(showLoader())

        let getNextMessagesAndStatuses;
        if (isFirstRequest) {
            getNextMessagesAndStatuses = chatDbApi.getMessagesAndStatusesWithLimit(roomId, 20);
        } else {
            getNextMessagesAndStatuses = yield select( store => store.chat.getNextMessagesAndStatuses );
        }
        const {value, done} = yield call( () => getNextMessagesAndStatuses.next() );
        if (!done) {
            const {messages, statuses, lastVisible} = value;
            if (messages.length) {
                yield put({ type: UPDATE_ROOMID_MESSAGES, payload: messages });
            }
            if (statuses.length) {
                yield put({ type: UPDATE_ROOMID_MESSAGES_STATUSES, payload: statuses });
            }
        }

        yield put({type: UPDATE_GET_NEXT_MESSAGES_AND_STATUSES, payload: getNextMessagesAndStatuses});
        yield put({ type: ALL_REQUEST_WITH_THE_CURRENT_ROOM_ARE_COMPLETED, payload: roomId });

        yield put(hideLoader());
        //yield put(showAlert({text: 'FETCH ROOM & MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        console.error("SAGA/REQUEST_ROOMID_MESSAGES: ", e);
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
