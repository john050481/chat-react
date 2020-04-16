import {REQUEST_CHATS} from './types'
import {showAlert} from './actions'

export const myMiddleware = store => next => action => {
//    console.log('store = ', store);
//    console.log('next = ', next);
//    console.log('action = ', action);

    if (action.type === REQUEST_CHATS) {
//        if (action.payload[0].title.toLowerCase().includes('fuck'))
//            return next(showAlert('FUCK!!!'));
    }
    return next(action);
}