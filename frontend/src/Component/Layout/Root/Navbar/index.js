import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt, FaSignOutAlt, FaInfo} from "react-icons/fa";
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import SearchMessage from '../../../SearchMessage'
import Settings from '../../../Settings';
import UserProfile from "../../../UserProfile";
import AuthForm from '../../../AuthForm';
import About from '../../../About';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css'
import {useAuth} from "../../../../hooks/useAuth";

function NavBarRoot(props) {
    console.log('Render NavBarRoot')

    const auth = useAuth();

    const components = {
        UserProfile: <UserProfile />,
        SearchMessage: <SearchMessage />,
        Settings: <Settings />,
        AuthForm: <AuthForm />,
        About: <About />
    }

    function handleClick(e) {
        e.preventDefault();
        let btn = e.target.closest('.navbarroot-block button')
        if (!btn) return;
        let component = btn.dataset.component;
        if (!component) return;
        props.setRender( (prev) => () => components[component] );
        props.showLayout({region: props.region});
    }

    return (
        <div className="navbarroot-block" onClick={handleClick}>
            <Container>
                <Row>
                    <Col>
                        <Button variant="success" data-component='UserProfile' title="user profile">{auth.user.photoURL ? <img className='navbar-root-profile-photo' src={auth.user.photoURL} /> : <FaUserAlt />}</Button>
                        <Button variant="outline-light" data-component='About' title="about"><FaInfo /></Button>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-primary" data-component='SearchMessage' title="search message"><FaSearch /></Button>
            <Button variant="outline-dark" data-component='Settings' title="settings"><FaCog /></Button>
            <Button variant="outline-secondary" data-component='AuthForm' title="signout"><FaSignOutAlt /></Button>
        </div>
    )
}

const mapStateToProps = store => {
    return {
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)