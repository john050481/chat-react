import { all } from 'redux-saga/effects'

import sagaLogger from './logger'
import sagaWatcherRequestUserRoomsMetadata from './requestUserRoomsMetadata'
import sagaWatcherRequestRoomIdMessages from './reguestRoomIdMessages'
import sagaWatcherRequestRoomIdMetadata from './requestRoomIdMetadata'
import sagaWatcherRequestUserContacts from './requestUserContacts'
import sagaWatcherAddMessage from './addNewMessage'
import sagaWatcherRequestUserRoomsUnreadMessage from './requestUserRoomsUnreadMessage'

//---ROOT---
export default function* rootSaga() {
    yield all([
        /*sagaLogger(),*/
        sagaWatcherRequestUserRoomsMetadata(),
        sagaWatcherRequestRoomIdMessages(),
        sagaWatcherRequestRoomIdMetadata(),
        sagaWatcherRequestUserContacts(),
        sagaWatcherAddMessage(),
        sagaWatcherRequestUserRoomsUnreadMessage()
    ])
}