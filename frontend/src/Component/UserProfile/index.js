import React, {useEffect, useState} from 'react';
import './style.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {useAuth} from "../../hooks/useAuth";

function UserProfile(props) {
    console.log("render Avatar");

    const auth = useAuth();
    console.log('auth.user = ', auth.user);
    const [email, setEmail] = useState(auth.user.email);
    const [phoneNumber, setPhoneNumber] = useState( (auth.user.phoneNumber || ''));
    const [displayName, setDisplayName] = useState( (auth.user.displayName || ''));

    function handlerOnChange(e, cb) {
        console.log('e.target.value ===', e.target.value);
        cb && cb(e.target.value)
    }

    return (
        <div>
            <h1>ЗАГЛУШКА (User profile)</h1>
            <Form className="avatar-block">
                <Form.Group controlId="formDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e)=>handlerOnChange(e, setDisplayName)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="numbers of [0-9]" pattern="[0-9]+" value={phoneNumber} onChange={(e)=>handlerOnChange(e, setPhoneNumber)}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>handlerOnChange(e, setEmail)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userUid: store.user.uid,
    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)