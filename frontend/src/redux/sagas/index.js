import { all } from 'redux-saga/effects'

import sagaWatcherRequestChatId from './requestChatId'
import sagaWatcherRequestChats from './requestChats'
import sagaLogger from './logger'

//---ROOT---
export default function* rootSaga() {
    yield all([
        sagaWatcherRequestChatId(),
        sagaWatcherRequestChats(),
        sagaLogger()
    ])
}