import { take, select } from 'redux-saga/effects'

//---LOGGER---
export default function* sagaLogger() {
    while (true) {
        const action = yield take('*')
        const state = yield select()
        console.log('LOGGER/action:', action)
        console.log('LOGGER/state after:', state)
    }
}
