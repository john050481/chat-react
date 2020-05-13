import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaWhatsapp, FaTrash} from "react-icons/fa";
import FakeSearchMessage from '../../../FakeComponent/FakeSearchMessage'
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import FakeSettings from '../../../FakeComponent/FakeSettings';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RoomInfo from "../RoomInfo";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const components = {
        RoomInfo: <RoomInfo />,
        FakeSearchMessage: <FakeSearchMessage />,
        FakeSettings: <FakeSettings />
    }

    function handleClick(e) {
        e.preventDefault();
        let elem = e.target.closest('[data-component]')
        if (!elem) return;
        let disabled = elem.disabled;
        let component = elem.dataset.component;
        if (!component || disabled) return;
        props.setRender( (prev) => () => components[component] );
        props.showLayout({region: props.region});
    }

    return (
            props.currentRoom &&
                <div className="navbarmain-block" onClick={handleClick}>
                    <Container>
                        <Row>
                            <Col>
                                <Button variant="outline-success" data-component='RoomInfo' title="room info"><FaWhatsapp /></Button>
                            </Col>
                        </Row>
                    </Container>
                    <Button variant="outline-primary" data-component='FakeSearchMessage' title="search message"><FaSearch /></Button>
                    <Button variant="outline-dark" data-component='FakeSettings' title="FakeSettings"><FaCog /></Button>
                    <Button variant="outline-secondary" data-component='' title="Delete chat"><FaTrash /></Button>
                </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoom: store.chat.currentRoom
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)