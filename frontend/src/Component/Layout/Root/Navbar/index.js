import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt, FaSignOutAlt} from "react-icons/fa";
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import SearchMessage from '../../../SearchMessage'
import Settings from '../../../Settings';
import UserProfile from "../../../UserProfile";
import AuthForm from '../../../AuthForm';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarRoot')

    const components = {
        UserProfile: <UserProfile />,
        SearchMessage: <SearchMessage />,
        Settings: <Settings />,
        AuthForm: <AuthForm />
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
                        <Button variant="outline-success" data-component='UserProfile' title="user profile"><FaUserAlt /></Button>
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