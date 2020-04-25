import React, {useEffect, useState} from 'react';
import './style.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {useAuth} from "../../hooks/useAuth";
import {showAlert} from "../../redux/actions";

function UserProfile({showAlert}) {
    console.log("render Avatar");

    const auth = useAuth();
    console.log('auth.user = ', auth.firebase.auth().currentUser === auth.user, auth);
    const [email, setEmail] = useState(auth.user.email);
    const [displayName, setDisplayName] = useState( (auth.user.displayName || ''));

    function handlerOnChange(e, cb) {
        console.log('e.target.value ===', e.target.value);
        cb && cb(e.target.value)
    }

    async function handlerUpdateProfile(e) {
        e.preventDefault();

        auth.user.updateProfile({displayName})
            .then( () => showAlert({text: 'Update profile successful!', options: {variant: 'success'}}) )
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error update profile!', error)
            });
    }

    async function handlerUpdateEmail(e) {
        e.preventDefault();

        const currentEmail = prompt('Введите текщий email:');
        const currentPassword = prompt('Введите текщий пароль:');
        if ( !currentEmail || !currentPassword) {
            showAlert({text: 'НЕТ ДАННЫХ!!!', options: {variant: 'danger'}});
            return;
        }
        const credential = auth.firebase.auth.EmailAuthProvider.credential(currentEmail, currentPassword);

        auth.user.reauthenticateWithCredential(credential)
            .then(() => {
                auth.user.updateEmail(email)
                    .then( () => showAlert({text: 'Update email successful!', options: {variant: 'success'}}) )
                    .catch( (error) => {
                        showAlert({text: error.message, options: {variant: 'danger'}})
                        console.log('Error update email:', error)
                    });
            })
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error reauthenticate:', error)
            });
    }

    return (
        <div className='user-profile-block'>
            <h1>User profile ({email})</h1>
            <Form className="user-profile-form">
                <Form.Group controlId="displayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e)=>handlerOnChange(e, setDisplayName)}/>
                </Form.Group>

                <Button variant="primary" onClick={handlerUpdateProfile}>
                    Update profile
                </Button>

                <hr />

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>handlerOnChange(e, setEmail)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={handlerUpdateEmail}>
                    Update email
                </Button>

                <hr />

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>

                <Form.Group controlId="idCheckMeOut">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Change password
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = store => {
    return {
    }
}
const mapDispatchToProps = {
    showAlert
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)