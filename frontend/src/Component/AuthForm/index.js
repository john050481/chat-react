import './style.css';
import React, {useState} from 'react';
import {AuthForm} from "@john0504/react-authform";
import {useRouter} from '../../hooks/useRouter';
import {useAuth} from '../../hooks/useAuth';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from "react-bootstrap/Container";

export default function AuthFormApp(props) {
    console.log('Render AuthForm')

    const [spinner, setSpinner] = useState(false);
    const [alert, setAlert] = useState({text: '', variant: 'success'});

    const router = useRouter();
    const auth = useAuth();

    function handlingPromise(promise, cb) {
        setSpinner(true);
        return promise
            .finally( () => {
                setSpinner(false);
            })
            .then( result => {
                console.log("RESULT = ", result);
                setAlert({text: 'Success!!!', variant: 'success'}); //{text: 'Success!!!', options: {variant: 'success'}}
                cb && cb()
            })
            .catch( error => {
                console.log("ERROR = ", error)
                setAlert({text: error.message, variant: 'danger'}); //{text: error.message, options: {variant: 'warning'}}
            })
    }

    function handleSignIn(e, formData) {
        e.preventDefault();
        const promise = auth.signin(formData.email, formData.password);
        handlingPromise(promise, () => router.push('/chat'));
    }
    function handleSignUp(e, formData) {
        e.preventDefault();
        const promise = auth.signup(formData.email, formData.password);
        handlingPromise(promise, () => router.push('/chat'));
    }
    function handleForgotPass(e, formData) {
        e.preventDefault();
        const promise = auth.sendPasswordResetEmail(formData.email);
        handlingPromise(promise);
    }
    function handleSignOut(e, formData) {
        e.preventDefault();
        const promise = auth.signout();
        handlingPromise(promise);
    }

    return (
        <>
            <AuthForm
                isAuth = {Boolean(auth.user)}
                handleSignIn = {handleSignIn}
                handleSignUp = {handleSignUp}
                handleForgotPass = {handleForgotPass}
                handleSignOut = {handleSignOut}
            />
            <Container className='authform-footer'>
                { (alert.text)
                    ? <Alert variant={alert.variant}>
                          {alert.text}
                      </Alert>
                    : null
                }
                { (spinner)
                    ? <Spinner animation="border" variant="secondary" />
                    : null
                }
            </Container>
        </>
    )
}
