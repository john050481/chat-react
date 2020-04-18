import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import React from 'react'

import {Switch, Route, Redirect, Link} from "react-router-dom";

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

    return (
        <>
{/* @john0504/react-authform нужно переделать */}
{/* нужен props: 1)для редиректа, 2)для isAuth (а не Redux connect) */}
{/* например: RequireAuth = (
                WrappedComponent,
                redirect=true,
                redirectUrl='...',
                isAuth=false
             ) */}

{/*
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        <Link to="/aboutauth">About (!!!сделать компонент RequireAuth)</Link>
                    </li>
                    <li>
                        <Link to="/auth">Auth</Link>
                    </li>
                </ul>
            </nav>
*/}
            <div>
                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/chat" component={useRequireAuth(RootLayout, '/auth')} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/auth">
                        <AuthForm auth={auth}/>
                    </Route>
                    <Redirect to="/chat" />
                </Switch>
            </div>
        </>
    );
}
//--------------------
