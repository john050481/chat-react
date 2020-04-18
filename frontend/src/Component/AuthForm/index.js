import './style.css';
import React, {useState} from 'react';
import {AuthForm} from "@john0504/react-authform";
import {useRouter} from '../../hooks/useRouter';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from "react-bootstrap/Container";

export default function AuthFormApp(props) {
    console.log('Render AuthForm', props.auth)

    const [spinner, setSpinner] = useState(false);
    const [alert, setAlert] = useState('');

    const router = useRouter();
    const auth = props.auth;

    function handlingPromise(promise, cb) {
        setSpinner(true);
        return promise
            .finally( () => {
                setSpinner(false);
            })
            .then( result => {
                console.log("RESULT = ", result);
                setAlert('Success!!!'); //{text: 'Success!!!', options: {variant: 'success'}}
                cb && cb()
            })
            .catch( error => {
                console.log("ERROR = ", error)
                setAlert(error.message); //{text: error.message, options: {variant: 'warning'}}
            })
    }

    function handlerForm(e) {
        e.preventDefault();

        let form = {};
        let formElem = e.currentTarget.form;
        console.log('formElem = ', formElem)
        if (formElem) {
            let data = new FormData(formElem);
            for (let pair of data.entries()) {
                form[pair[0]] = pair[1];
            }
            console.log('form = ', form);
        }
        return form;
    }

    function handleSignIn(e) {
        const form = handlerForm(e);
        const promise = auth.signin(form.email, form.password);
        handlingPromise(promise, () => router.push('/chat'));
    }
    function handleSignUp(e) {
        const form = handlerForm(e);
        const promise = auth.signup(form.email, form.password);
        handlingPromise(promise);
    }
    function handleForgotPass(e) {
        const form = handlerForm(e);
        const promise = auth.sendPasswordResetEmail(form.email);
        handlingPromise(promise);
    }
    function handleSignOut(e) {
        //const form = handlerForm(e);
        const promise = auth.signout();
        handlingPromise(promise);
    }

    return ( (auth.user === null)
            ? <Container className='authform-spinner'>
                <Spinner animation="grow" variant="secondary" />
              </Container>
            : <>
                <AuthForm
                    isAuth = {Boolean(auth.user)}
                    handleSignIn = {handleSignIn}
                    handleSignUp = {handleSignUp}
                    handleForgotPass = {handleForgotPass}
                    handleSignOut = {handleSignOut}
                />
                <Container className='authform-footer'>
                    { (alert)
                        ? <Alert variant="warning">
                              {alert}
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
