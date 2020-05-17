import { all } from 'redux-saga/effects'

import sagaLogger from './logger'
import sagaWatcherRequestUserRoomsMetadata from './requestUserRoomsMetadata'
import sagaWatcherRequestRoomIdAndMessages from './reguestRoomIdAndMessages'
import sagaWatcherRequestUpdateRoomIdMetadata from './requestUpdateRoomIdMetadata'
import sagaWatcherRequestUserContacts from './requestUserContacts'

//---ROOT---
export default function* rootSaga() {
    yield all([
        /*sagaLogger(),*/
        sagaWatcherRequestUserRoomsMetadata(),
        sagaWatcherRequestRoomIdAndMessages(),
        sagaWatcherRequestUpdateRoomIdMetadata(),
        sagaWatcherRequestUserContacts()
    ])
}