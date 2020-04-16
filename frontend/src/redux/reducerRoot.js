import {combineReducers} from "redux";

import reducerApp from './reducerApp'
import reducerChat from './reducerChat'

export const reducerRoot = combineReducers({
    app: reducerApp,
    chat: reducerChat
})
