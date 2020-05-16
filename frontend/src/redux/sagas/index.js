import { all } from 'redux-saga/effects'

import sagaLogger from './logger'
import sagaWatcherRequestUserRoomsMetadata from './requestUserRoomsMetadata'
import sagaWatcherRequestRoomIdAndMessages from './reguestRoomIdAndMessages'
import sagaWatcherRequestUpdateRoomIdMetadata from './requestUpdateRoomIdMetadata'

//---ROOT---
export default function* rootSaga() {
    yield all([
        /*sagaLogger(),*/
        sagaWatcherRequestUserRoomsMetadata(),
        sagaWatcherRequestRoomIdAndMessages(),
        sagaWatcherRequestUpdateRoomIdMetadata()
    ])
}