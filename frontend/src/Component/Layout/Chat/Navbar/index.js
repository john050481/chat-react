import './style.css';
import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaWhatsapp, FaTrash} from "react-icons/fa";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useChat} from "../../../../hooks/useChatFirebase";
import useLayout from "../../useLayout";

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const chatDb = useChat();

    /*LAYOUT*/
    const handleClick = useLayout({region: props.region});
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
        currentRoomId: store.chat.currentRoomId
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)