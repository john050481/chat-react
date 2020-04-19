import {USER_LOGIN} from './types'

const init = {
    isAuth: false,
    uid: '',
    email: ''
}

export default function (state = init, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {...state, isAuth: true, email: action.payload.email, uid: action.payload.uid}
        default:
            return state
    }
}