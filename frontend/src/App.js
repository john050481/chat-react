import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import React from 'react'

import {Switch, Route, Redirect} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import useRequireAuth from './hooks/useRequireAuth';

import AuthForm from './Component/AuthForm'
import RootLayout from './Component/Layout/Root'

//--------------------EXAMPLE
function About() {
    return <h2>About</h2>;
}
//---------------------------
export default function App() {
    const auth = useAuth();

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
