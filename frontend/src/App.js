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
import {userLogin, userLogout} from "./redux/actions";
import {connect} from "react-redux";

function App({userLogin, userLogout}) {
    console.log('Render APP!');
    const auth = useAuth();

    useEffect( () => {
        if (auth.user) {
            userLogin(auth.user);
        } else if (auth.user === false) {
            userLogout()
        }
    }, [auth])

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
                      <AuthForm /*auth={auth}*/ />
                  </Route>
                  <Redirect to="/chat" />
              </Switch>
    );
}

const mapDispatchToProps = {
    userLogin,
    userLogout
}
export default connect(null, mapDispatchToProps)(App)