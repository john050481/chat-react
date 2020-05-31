import './style.css';
import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaInfoCircle, FaVolumeUp, FaVolumeMute, FaTrash} from "react-icons/fa";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useChat} from "../../../../hooks/useChatFirebase";
import useLayout from "../../useLayout";
import {showAlert} from "../../../../redux/actions";

function NavBarRoot(props) {
    console.log('Render NavBarMain')

    const chatDb = useChat();

    /*LAYOUT*/
    const handleShowLayout = useLayout({region: props.region});
    /*LAYOUT*/

    function handleClickMuteRoom(e) {
        chatDb.toggleMuteRoom(props.currentRoomId)
            .then( () => props.showAlert({text: 'Done!', options: {variant: 'success'}}) )
            .catch( e => props.showAlert({text: e.message, options: {variant: 'danger'}}) );
    }
    function handleClickLeaveRoom(e) {
        let isLeaveRoom = confirm("Выйти из чата?");
        if (isLeaveRoom)
            chatDb.leaveRoom(props.currentRoomId);
    }

    const roomIsMuted = chatDb.userData.muted.includes(props.currentRoomId);

    return (
            props.currentRoomId &&
                <div className="navbarmain-block" onClick={handleShowLayout}>
                    <Container>
                        <Row>
                            <Col>
                                <Button variant="outline-success" data-component='RoomInfo' title="room info"><FaInfoCircle size={'1.3em'} /></Button>
                            </Col>
                        </Row>
                    </Container>
                    <Button variant="outline-primary" data-component='FakeSearchMessage' title="search message"><FaSearch /></Button>
                    <Button variant="outline-dark" data-component='FakeSettings' title="FakeSettings"><FaCog /></Button>
                    <Button variant={roomIsMuted ? "outline-secondary" : "outline-success"} data-component='' title="leave room" onClick={handleClickMuteRoom}>
                        {
                            roomIsMuted
                            ? <FaVolumeMute />
                            : <FaVolumeUp />
                        }
                    </Button>
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
    showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)