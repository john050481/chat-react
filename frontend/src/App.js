import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import React from 'react'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AuthForm, RequireAuth} from "@john0504/react-authform";
import RootLayout from './Component/Layout/Root'

//--------------------
function About() {
    return <h2>About</h2>;
}

export default function App() {
  return (
      <BrowserRouter>
          <nav>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      {/* @john0504/react-authform нужно переделать */}
                      {/* нужен props: 1)для редиректа, 2)для isAuth (а не Redux connect) */}
                      {/* например: RequireAuth = (
                          WrappedComponent,
                          redirect=true,
                          redirectUrl='...',
                          isAuth=false
                          ) */}
                      <Link to="/about">About (!!!сделать компонент RequireAuth)</Link>
                  </li>
                  <li>
                      <Link to="/auth">Auth</Link>
                  </li>
              </ul>
          </nav>
          <div>
              {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/about" component={RequireAuth(About)} />
                  <Route path="/auth">
                    <AuthForm isAuth={false}/>
                  </Route>
                  <Route path="/">
                      <RootLayout />
                  </Route>
              </Switch>
          </div>
      </BrowserRouter>
  );
}
//--------------------
