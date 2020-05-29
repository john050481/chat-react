import React, {useState} from 'react';
import './style.css'
import Form from "react-bootstrap/Form";
import ButtonWithLoader from "../../../../../common/ButtonWithLoader";
import {connect} from "react-redux";
import {useAuth} from "../../../../../hooks/useAuth";
import {showAlert} from "../../../../../redux/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReauthenticateWithCredential from './ReauthenticateWithCredential';
import {FaUserAlt} from "react-icons/fa";

function UserProfile({showAlert, photoURLInStore, emailInStore, displayNameInStore}) {
    console.log("Render UserProfile Credentials");

    const auth = useAuth();
    const [email, setEmail] = useState(emailInStore);
    const [displayName, setDisplayName] = useState( (displayNameInStore || '') );
    const [photoURL, setPhotoURL] = useState( (photoURLInStore || '') );
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checkMeOut, setCheckMeOut] = useState(false);
    const [loadersButtons, setLoadersButtons] = useState({profile: false, email: false, password: false});

    const [callbackToModal, setCallbackToModal] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    function handlerUpdateProfile(e) {
        e.preventDefault();
        setLoadersButtons( prev => ({...prev, profile: true}));
        auth.user.updateProfile({displayName, photoURL})
            .then( () => {
                showAlert({text: 'Update profile successful!', options: {variant: 'success'}})
            } )
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error update profile!', error)
            })
            .finally( () => {
                setLoadersButtons( prev => ({...prev, profile: false}));
            });
        ;
    }

    async function requestCredentialFromUser() {
        const {email, password} = await new Promise( (response, reject) => {
            setCallbackToModal((prev) => response); //callback = Promise-response from modal window
            setOpenModal(true); //open modal
        });
        setCallbackToModal(null);

        return [email, password]
    }

    async function getCredential() {
        const [enteredEmail, enteredPassword] = await requestCredentialFromUser()

        if ( !enteredEmail || !enteredPassword) {
            throw new Error('НЕ все данные введены!!!');
        }

        return auth.firebase.auth.EmailAuthProvider.credential(enteredEmail, enteredPassword);
    }

    async function handlerUpdateEmail(e) {
        e.preventDefault();
        setLoadersButtons( prev => ({...prev, email: true}));

        let credential;
        try {
            credential = await getCredential();
        } catch (error) {
            setLoadersButtons( prev => ({...prev, email: false}));
            showAlert({text: error.message, options: {variant: 'danger'}})
            console.log('Error get/request credential:', error);
            return;
        }

        auth.user.reauthenticateWithCredential(credential)
            .then(() => {
                auth.user.updateEmail(email)
                    .then( () => {
                        showAlert({text: 'Update email successful!', options: {variant: 'success'}})
                    } )
                    .catch( (error) => {
                        showAlert({text: error.message, options: {variant: 'danger'}})
                        console.log('Error update email:', error)
                    });
            })
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error reauthenticate:', error)
            })
            .finally( () => {
                setLoadersButtons( prev => ({...prev, email: false}));
            });
        ;
    }

    async function handlerUpdatePassword(e) {
        e.preventDefault();
        setLoadersButtons( prev => ({...prev, password: true}));

        if (password !== passwordConfirm) {
            showAlert({text: 'Пароли не одинаковые!!!', options: {variant: 'danger'}});
            return;
        }

        let credential;
        try {
            credential = await getCredential();
        } catch (error) {
            setLoadersButtons( prev => ({...prev, password: false}));
            showAlert({text: error.message, options: {variant: 'danger'}})
            console.log('Error get/request credential:', error);
            return;
        }

        auth.user.reauthenticateWithCredential(credential)
            .then(() => {
                auth.user.updatePassword(password)
                    .then( () => {
                        setPassword('');
                        setPasswordConfirm('');
                        showAlert({text: 'Update password successful!', options: {variant: 'success'}});
                        if (checkMeOut) auth.signout();
                    } )
                    .catch( (error) => {
                        showAlert({text: error.message, options: {variant: 'danger'}})
                        console.log('Error update password:', error)
                    });
            })
            .catch( (error) => {
                showAlert({text: error.message, options: {variant: 'danger'}})
                console.log('Error reauthenticate:', error)
            })
            .finally( () => {
                setLoadersButtons( prev => ({...prev, password: false}));
            });
    }

    return (
        <div className='user-profile-credential-block'>
            <h1>{displayNameInStore + ' / ' + emailInStore}</h1>

            <Container className='user-profile-credential-photo-container'>
                <Row>
                    <Col xs={6} md={4}>
                        <div className="user-profile-credential-photo round">
                            {photoURLInStore ? <img src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} /> : <FaUserAlt />}
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div className="user-profile-credential-photo square">
                            {photoURLInStore ? <img src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} /> : <FaUserAlt />}
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div className="user-profile-credential-photo rectangle_4x3">
                            {photoURLInStore ? <img src={photoURLInStore ? photoURLInStore : "/defaulAvatar.png"} /> : <FaUserAlt />}
                        </div>
                    </Col>
                </Row>
            </Container>

            <Form className="user-profile-credential-form">
                {/*PROFILE*/}
                <Form.Group>
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control type="text" placeholder="http://example.com/example-photo.jpg" value={photoURL} onChange={(e)=>setPhotoURL(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
                </Form.Group>
                <ButtonWithLoader variant="primary" onClick={handlerUpdateProfile} visibleLoader={loadersButtons.profile} >
                    Update profile
                </ButtonWithLoader>

                <hr />

                {/*EMAIL*/}
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <ButtonWithLoader variant="primary" onClick={handlerUpdateEmail} visibleLoader={loadersButtons.email} >
                    Update email
                </ButtonWithLoader>

                <hr />

                {/*PASSWORD*/}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Check id='checkMeOut' type="checkbox" label="Check me out" checked={checkMeOut} onChange={(e)=>setCheckMeOut(!checkMeOut)}/>
                </Form.Group>
                <ButtonWithLoader variant="primary" onClick={handlerUpdatePassword} visibleLoader={loadersButtons.password} >
                    Change password
                </ButtonWithLoader>
            </Form>
            <ReauthenticateWithCredential
                openModal={openModal}
                setOpenModal={setOpenModal}
                callback={ (e, data) => callbackToModal && callbackToModal(data) }
            />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        photoURLInStore: store.auth.user.photoURL,
        emailInStore: store.auth.user.email,
        displayNameInStore: store.auth.user.displayName
    }
}
const mapDispatchToProps = {
    showAlert
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)