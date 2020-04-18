import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//---------------------------------REDUX LIBS---------------------------------
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
//---------------------------------REDUX options------------------------------
import {reducerRoot} from './redux/reducerRoot'
import {myMiddleware} from './redux/middleware'
import mySagas from './redux/sagas';
//---------------------------------AUTH---------------------------------------
import { ProvideAuth } from "./hooks/useAuth";
//----------------------------------------------------------------------------

let sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducerRoot, composeEnhancers(
    applyMiddleware(
        myMiddleware,
        thunk,
        sagaMiddleware
    )
))
sagaMiddleware.run(mySagas);

ReactDOM.render(
    <ProvideAuth>
        <Provider store={store}>
            <App />
        </Provider>
    </ProvideAuth>, document.getElementById('app')
);
