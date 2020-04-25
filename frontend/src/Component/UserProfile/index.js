import React, {useState} from 'react';
import './style.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {useAuth} from "../../hooks/useAuth";
import {showAlert} from "../../redux/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function UserProfile({showAlert, photoURLInStore, emailInStore, displayNameInStore}) {
    console.log("render UserProfile");

    const auth = useAuth();
    const [email, setEmail] = useState(emailInStore);
    const [displayName, setDisplayName] = useState( (displayNameInStore || ''));
    const [photoURL, setPhotoURL] = useState( (photoURLInStore || ''));

    function handlerUpdateProfile(e) {
        e.preventDefault();

        auth.user.updateProfile({displayName, photoURL})
            .then( () => showAlert({text: 'Update profile successful!', options: {variant: 'success'}}) )
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error update profile!', error)
            });
    }

    function handlerUpdateEmail(e) {
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
            <h1>{displayNameInStore + ' / ' + emailInStore}</h1>

            <Container className='user-profile-photo-container'>
                <Row>
                    <Col xs={6} md={4}>
                        <Image className='user-profile-photo' src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} rounded />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image className='user-profile-photo' src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} roundedCircle />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image className='user-profile-photo' src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} thumbnail />
                    </Col>
                </Row>
            </Container>

            <hr />

            <Form className="user-profile-form">

                {/*PROFILE*/}
                <Form.Group>
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter photo URL" value={photoURL} onChange={(e)=>setPhotoURL(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" onClick={handlerUpdateProfile}>
                    Update profile
                </Button>

                <hr />

                {/*EMAIL*/}
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={handlerUpdateEmail}>
                    Update email
                </Button>

                <hr />

                {/*PASSWORD*/}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>
                <Form.Group>
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
        photoURLInStore: store.user.user.photoURL,
        emailInStore: store.user.user.email,
        displayNameInStore: store.user.user.displayName
    }
}
const mapDispatchToProps = {
    showAlert
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)