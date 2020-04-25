import {USER_LOGIN} from './types'

const init = {
    user: null
}

export default function (state = init, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {...state, user: action.payload}
        default:
            return state
    }
}