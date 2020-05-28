import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import SpinnerApp from "./Component/Spinner";

import React, {useEffect} from 'react'

import {Switch, Route, Redirect} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import HOCRequireAuth from './hooks/HOCRequireAuth';

import AuthForm from './Component/AuthForm'
import RootLayout from './Component/Layout/Root'
import About from './Component/About';
import {chatUserEnter, chatUserExit, userLogin, userLogout} from "./redux/actions";
import {connect} from "react-redux";
import {useChat} from "./hooks/useChatFirebase";

function App({userLogin, userLogout, chatUserEnter, chatUserExit}) {
    console.log('Render APP!');
    const auth = useAuth();
    const chatDb = useChat();

    useEffect( () => {
        if (auth.user) {
            userLogin(auth.user);
        } else if (auth.user === false) {
            userLogout()
        }
    }, [auth])

    useEffect( () => {
        if (chatDb.userData) {
            chatUserEnter(chatDb.userData);
        } else {
            chatUserExit()
        }
    }, [chatDb.userData])

    return ( auth.user === null
            ? <SpinnerApp />
            : <Switch>
                  <Route exact path="/chat" component={HOCRequireAuth(RootLayout, '/auth')} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/auth">
                      {/*УДАЛИТЬ EXAMPLE!!!*/}
                      <div style={{fontSize: '20px', textAlign: 'center', marginTop: '57px'}}>
                          Для примера введите LOGIN / PASSWORD: <span style={{color: 'red'}}>example@example.ru</span>
                      </div>
                      <div style={{fontSize: '20px', textAlign: 'center', marginTop: '57px'}}>
                          для второго пользователя: <span style={{color: 'red'}}>example1@example.ru</span>
                      </div>
                      <AuthForm /*auth={auth}*/ />
                  </Route>
                  <Redirect to="/chat" />
              </Switch>
    );
}

const mapDispatchToProps = {
    userLogin,
    userLogout,
    chatUserEnter,
    chatUserExit
}
export default connect(null, mapDispatchToProps)(App)