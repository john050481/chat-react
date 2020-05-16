import './style.css';
import React, {useState} from 'react';
import {AuthForm} from "@john0504/react-authform";
import {useRouter} from '../../hooks/useRouter';
import {useAuth} from '../../hooks/useAuth';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from "react-bootstrap/Container";

const DELAY = 3;//sec

export default function AuthFormApp(props) {
    console.log('Render AuthForm')

    const [spinner, setSpinner] = useState(false);
    const [alert, setAlert] = useState({text: '', variant: 'success'});
    const [countDown, setCountDown] = useState(0);

    const router = useRouter();
    const auth = useAuth();

    function handlingPromise(promise, messageSuccess='', delaySec, redirectUrl) {
        setSpinner(true);
        return promise
            .finally( () => {
                setSpinner(false);
            })
            .then( async (result) => {
                setAlert({text: 'Success!!!' + ' ' + messageSuccess, variant: 'success'});
                if (delaySec) await startFinalCountDown(DELAY)
                if (redirectUrl) router.push(redirectUrl)
                return result;
            })
            .catch( error => {
                console.log("ERROR = ", error)
                setAlert({text: error.message, variant: 'danger'});
            })
    }

    async function startFinalCountDown(timeSec) {
        for (let i = timeSec; i >= 0; i--) {
            setCountDown(i);
            await new Promise( resolve => setTimeout(resolve, 1000) );
        }
    }

    function handleSignIn(e, formData) {//SIGNIN
        e.preventDefault();
        const promise = auth.signin(formData.email, formData.password);
        handlingPromise(promise, 'Вы вошли в систему!', DELAY, '/chat')
    }
    function handleSignUp(e, formData) {//SIGNUP
        e.preventDefault();
        const promise = auth.signup(formData.email, formData.password);
        handlingPromise(promise, 'Вы зарегистрировались и вошли в систему!', DELAY, '/chat')
    }
    function handleForgotPass(e, formData) {//FORGOTPASS
        e.preventDefault();
        const promise = auth.sendPasswordResetEmail(formData.email);
        handlingPromise(promise, 'Инструкции отправлены на Вашу почту!')
    }
    function handleSignOut(e, formData) {//SIGNOUT
        e.preventDefault();
        const promise = auth.signout();
        handlingPromise(promise, 'Вы вышли из системы!')
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
                          { alert.text + ' ' + (countDown ? countDown : '') }
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
