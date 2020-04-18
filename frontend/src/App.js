import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import React from 'react'

import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import { useRequireAuth } from "./hooks/useRequireAuth";
import { useAuth, ProvideAuth } from "./hooks/useAuth";

import AuthForm from './Component/AuthForm'
import {RequireAuth} from "@john0504/react-authform";
import RootLayout from './Component/Layout/Root'

//--------------------EXAMPLE
function About() {
    return <h2>About</h2>;
}

export default function App() {
    const auth = useAuth();

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        {/* @john0504/react-authform нужно переделать */}
                        {/* нужен props: 1)для редиректа, 2)для isAuth (а не Redux connect) */}
                        {/* например: RequireAuth = (
                          WrappedComponent,
                          redirect=true,
                          redirectUrl='...',
                          isAuth=false
                          ) */}
                        <Link to="/aboutauth">About (!!!сделать компонент RequireAuth)</Link>
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
                    <Route path="/chat">
                        <RootLayout />
                    </Route>
                    <Route path="/aboutauth" component={RequireAuth(About)} />
                    <Route path="/about" component={About} />
                    <Route path="/auth">
                        <AuthForm auth={auth}/>
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
