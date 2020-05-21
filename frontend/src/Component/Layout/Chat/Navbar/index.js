import './style.css';
import React, {useEffect} from "react";
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
import {useChat} from "../../../../hooks/useChatFirebase";

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const chatDb = useChat();

    /*LAYOUT*/
    useEffect( () => {
        if (!props.layout.region || !props.layout.component)
            return;

        if (props.layout.region === props.region)
            props.setRender( (prev) => () => components[props.layout.component] );
    }, [props.layout]);
    const components = {
        RoomInfo: <RoomInfo />,
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
        props.showLayout({region: props.region, component});
    }
    /*LAYOUT*/

    function handleClickLeaveRoom(e) {
        let isLeaveRoom = confirm("Выйти из чата?");
        if (isLeaveRoom)
            chatDb.leaveRoom(props.currentRoomId);
    }

    return (
            props.currentRoomId &&
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
                    <Button variant="outline-secondary" data-component='' title="leave room" onClick={handleClickLeaveRoom}><FaTrash /></Button>
                </div>
    )
}

const mapStateToProps = store => {
    return {
        currentRoomId: store.chat.currentRoomId,
        layout: store.app.layout
    }
}
const mapDispatchToProps = {
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)