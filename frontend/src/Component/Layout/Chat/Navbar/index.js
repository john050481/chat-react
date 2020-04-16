import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt} from "react-icons/fa";
import SearchMessage from '../../../SearchMessage'
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import Settings from '../../../Settings';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserProfile from "../../../UserProfile";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const components = {
        UserProfile: <UserProfile />,
        SearchMessage: <SearchMessage />,
        Settings: <Settings />
    }

    function handleClick(e) {
        e.preventDefault();
        let btn = e.target.closest('.navbarmain-block button')
        if (!btn) return;
        let component = btn.dataset.component;
        if (!component) return;
        props.setRender( (prev) => () => components[component] );
        props.showLayout({region: props.region});
    }

    return (
        <div className="navbarmain-block" onClick={handleClick}>
            <Container>
                <Row>
                    <Col>
                        <Button variant="outline-success" data-component='UserProfile' title="user profile"><FaUserAlt /></Button>
                    </Col>
                </Row>
            </Container>
{/*
            <Button variant="outline-primary">Pr</Button>{' '}
            <Button variant="outline-secondary">Se</Button>{' '}
            <Button variant="outline-success">Su</Button>{' '}
            <Button variant="outline-warning">Wa</Button>{' '}
            <Button variant="outline-danger">Da</Button>{' '}
            <Button variant="outline-info">In</Button>{' '}
            <Button variant="outline-light">Li</Button>{' '}
*/}
            <Button variant="outline-primary" data-component='SearchMessage' title="search message"><FaSearch /></Button>
            <Button variant="outline-dark" data-component='Settings' title="settings"><FaCog /></Button>
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