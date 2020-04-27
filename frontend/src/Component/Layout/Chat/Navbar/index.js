import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt} from "react-icons/fa";
import FakeSearchMessage from '../../../FakeComponent/FakeSearchMessage'
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import FakeSettings from '../../../FakeComponent/FakeSettings';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FakeProfile from "../../../FakeComponent/FakeProfile";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const components = {
        FakeProfile: <FakeProfile />,
        FakeSearchMessage: <FakeSearchMessage />,
        FakeSettings: <FakeSettings />
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
        <div className="navbarmain-block" onClick={handleClick}>
            <Container>
                <Row>
                    <Col>
                        <Button variant="outline-success" data-component='FakeProfile' title="user profile"><FaUserAlt /></Button>
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
            <Button variant="outline-primary" data-component='FakeSearchMessage' title="search message"><FaSearch /></Button>
            <Button variant="outline-dark" data-component='FakeSettings' title="FakeSettings"><FaCog /></Button>
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