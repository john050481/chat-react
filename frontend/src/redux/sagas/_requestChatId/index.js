import {put, takeLatest, all, call} from 'redux-saga/effects'
import {REQUEST_CHATID, FETCHED_CHATID, UPDATE_ROOMID_MESSAGES} from '../../types';
import {showLoader, hideLoader, showAlert} from '../../actions';

//---REGUEST ONE CHAT (FOR ID)---
export default function* sagaWatcherRequestChatId() {
    yield takeLatest(REQUEST_CHATID, sagaWorkerRequestChatId);
}
function* sagaWorkerRequestChatId(action) {
    const chatId = action.payload;
    const urlChat = `https://jsonplaceholder.typicode.com/users/${chatId}`;
    const urlMessages = `https://jsonplaceholder.typicode.com/posts?userId=${chatId}`;

    try {
        yield put(showLoader())

        const { chatRes, messagesRes } = yield all({
            chatRes: call(fetch, urlChat),
            messagesRes: call(fetch, urlMessages)
        });
        const { chatInfo, messages } = yield all({
            chatInfo: call(chatRes.json.bind(chatRes)),
            messages: call(messagesRes.json.bind(messagesRes))
        });
        yield put({ type: FETCHED_CHATID, payload: chatInfo });
        yield put({ type: UPDATE_ROOMID_MESSAGES, payload: messages });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CHAT/MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}
