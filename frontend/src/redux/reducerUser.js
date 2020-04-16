import {AUTH} from './types'

const init = {
    isAuth: false
}

export default function (state = init, action) {
    switch (action.type) {
        case AUTH:
            return {...state, isAuth: action.payload}
        default:
            return state
    }
}