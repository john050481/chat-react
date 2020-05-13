import { all } from 'redux-saga/effects'

import sagaLogger from './logger'
import sagaWatcherRequestUserRoomsMetadata from './requestUserRoomsMetadata'
import sagaWatcherRequestRoomId from './reguestRoomId'

//---ROOT---
export default function* rootSaga() {
    yield all([
        sagaLogger(),
        sagaWatcherRequestUserRoomsMetadata(),
        sagaWatcherRequestRoomId()
    ])
}