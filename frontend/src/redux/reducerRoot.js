import {combineReducers} from "redux";
import reducerApp from './reducerApp'
import reducerChat from './reducerChat'
import reducerUser from "./reducerUser";
import {USER_LOGOUT} from './types'

//---НУЖНО ОБНУЛИТЬ СТЕЙТ(при логауте)---
const appReducer = combineReducers({
    auth: reducerUser,
    app: reducerApp,
    chat: reducerChat
})

export const reducerRoot = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }

    return appReducer(state, action)
}
