import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt, FaSignOutAlt, FaInfo} from "react-icons/fa";
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import FakeSearchMessage from '../../../FakeComponent/FakeSearchMessage'
import FakeSettings from '../../../FakeComponent/FakeSettings';
import UserProfile from "../../../UserProfile";
import AuthForm from '../../../AuthForm';
import About from '../../../About';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarRoot')

    const components = {
        UserProfile: <UserProfile />,
        FakeSearchMessage: <FakeSearchMessage />,
        FakeSettings: <FakeSettings />,
        AuthForm: <AuthForm />,
        About: <About />
    }

    function handleClick(e) {
        e.preventDefault();
        let elem = e.target.closest('[data-component]')
        if (!elem) return;
        let component = elem.dataset.component;
        if (!component) return;
        props.setRender( (prev) => () => components[component] );
        props.showLayout({region: props.region});
    }

    return (
        <div className="navbar-root-block" onClick={handleClick}>
            <Container>
                <Row>
                    <Col>
                        <div className="navbar-root-profile-img mr-2">
                            {props.photoURL ? <img data-component='UserProfile' src={props.photoURL} /> : <FaUserAlt data-component='UserProfile'/>}
                        </div>
                        <Button variant="outline-light" data-component='About' title="about"><FaInfo /></Button>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-primary" data-component='FakeSearchMessage' title="search message"><FaSearch /></Button>
            <Button variant="outline-dark" data-component='FakeSettings' title="settings"><FaCog /></Button>
            <Button variant="outline-secondary" data-component='AuthForm' title="signout"><FaSignOutAlt /></Button>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        photoURL: store.auth.user ? store.auth.user.photoURL : ''
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)