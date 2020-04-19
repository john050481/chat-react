import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import React, {useEffect} from 'react'

import {Switch, Route, Redirect} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import useRequireAuth from './hooks/useRequireAuth';

import AuthForm from './Component/AuthForm'
import RootLayout from './Component/Layout/Root'
import About from './Component/About';
import {userLogin, userLogout} from "./redux/actions";
import {connect} from "react-redux";

function App(props) {
    const auth = useAuth();

    useEffect( () => {
        if (auth.user) {
            props.userLogin(auth.user);
        } else if (auth.user === false) {
            props.userLogout()
        }
    }, [auth])

    return ( auth.user === null
            ? <Container className='App-spinner-container'>
                  <Spinner className='App-spinner' animation="grow" variant="info" />
              </Container>
            : <Switch>
                  <Route exact path="/chat" component={useRequireAuth(RootLayout, '/auth')} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/auth">
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