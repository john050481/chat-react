import {put, takeEvery, takeLatest, take, select, all, call} from 'redux-saga/effects'
import {REQUEST_CHATID, REQUEST_CHATS, FETCHED_CHATID, FETCHED_MESSAGES, FETCHED_CHATS} from './types';
import {showLoader, hideLoader, showAlert} from './actions';

//---REGUEST ALL CHATS---
function* sagaWatcherRequestChats() {
    yield takeEvery(REQUEST_CHATS, sagaWorkerRequestChats);
}
function* sagaWorkerRequestChats() {
    const url = `https://jsonplaceholder.typicode.com/users`;

    try {
        yield put(showLoader())
        let response = yield call(fetch, url);
        let chats = yield call(response.json.bind(response));
        yield put({ type: FETCHED_CHATS, payload: chats });
        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CHATS DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
        yield put(hideLoader())
    }
}

//---LOGGER---
function* sagaLogger() {
    while (true) {
        const action = yield take('*')
        const state = yield select()
        console.log('LOGGER/action:', action)
        console.log('LOGGER/state after:', state)
    }
}

//---REGUEST ONE CHAT (FOR ID)---
function* sagaWatcherRequestChatId() {
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
        yield put({ type: FETCHED_MESSAGES, payload: messages });

        yield put(hideLoader());
        yield put(showAlert({text: 'FETCH CHAT/MASSAGES DONE!!!', options: {variant: 'success'}}))
    } catch(e) {
        yield put(hideLoader());
        yield put(showAlert({text: e.message, options: {variant: 'danger'}}));
    }
}

//---ROOT---
export default function* rootSaga() {
    yield all([
        sagaWatcherRequestChatId(),
        sagaWatcherRequestChats(),
        sagaLogger()
    ])
}