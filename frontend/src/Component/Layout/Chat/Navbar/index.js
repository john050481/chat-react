import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaWhatsapp} from "react-icons/fa";
import FakeSearchMessage from '../../../FakeComponent/FakeSearchMessage'
import {showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";
import FakeSettings from '../../../FakeComponent/FakeSettings';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatInfo from "../ChatInfo";
import './style.css'

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const components = {
        ChatInfo: <ChatInfo />,
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
        <div className="navbarmain-block" onClick={handleClick}>
            <Container>
                <Row>
                    <Col>
                        <Button
                            variant="outline-success"
                            data-component='ChatInfo'
                            title={!props.chatInfo ? "chat info: выберите чат!" : "chat info" }
                            disabled={!props.chatInfo}
                        >
                            <FaWhatsapp />
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-primary" data-component='FakeSearchMessage' title="search message"><FaSearch /></Button>
            <Button variant="outline-dark" data-component='FakeSettings' title="FakeSettings"><FaCog /></Button>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        chatInfo: store.chat.chatInfo
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)