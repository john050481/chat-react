import {
    SHOW_LAYOUT,
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
    VISIBILITY_CHANGE,
    APP_IN_FOCUS
} from './types'

const init = {
    appIsVisible: null,
    appInFocus: null,
    loader: {
        visible: false,
        options: {}
    },
    alert: {
        text: '',
        options: {}
    },
    layout: {
        region: '',
        component: '',
        props: null
    }
}

export default function (state = init, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loader: {visible: true, ...action.payload}}
        case HIDE_LOADER:
            return {...state, loader: {visible: false, options: {}}}
        case SHOW_ALERT:
            return {...state, alert: {...action.payload}}
        case HIDE_ALERT:
            return {...state, alert: {text: null, options: {}}}
        case SHOW_LAYOUT:
            return {...state, layout: action.payload}
        case VISIBILITY_CHANGE:
            return {...state, appIsVisible: action.payload}
        case APP_IN_FOCUS:
            return {...state, appInFocus: action.payload}
        default:
            return state
    }
}