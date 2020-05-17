import {combineReducers} from "redux";
import reducerApp from './reducerApp'
import reducerChat from './reducerChat'
import reducerAuth from "./reducerAuth";
import {USER_LOGOUT} from './types'

//---НУЖНО ОБНУЛИТЬ СТЕЙТ(при логауте)---
const appReducer = combineReducers({
    auth: reducerAuth,
    app: reducerApp,
    chat: reducerChat
})

export const reducerRoot = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }

    return appReducer(state, action)
}
