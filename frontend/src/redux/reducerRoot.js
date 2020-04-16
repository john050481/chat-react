import {combineReducers} from "redux";

import reducerApp from './reducerApp'
import reducerChat from './reducerChat'
import reducerUser from "./reducerUser";

export const reducerRoot = combineReducers({
    user: reducerUser,
    app: reducerApp,
    chat: reducerChat
})
