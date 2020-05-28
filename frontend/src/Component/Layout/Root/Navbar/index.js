import './style.css'
import React from "react";
import Button from "react-bootstrap/Button";
import {FaSearch, FaCog, FaUserAlt, FaSignOutAlt, FaInfo} from "react-icons/fa";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useLayout from '../../useLayout';

function NavBarRoot(props) {
    console.log('Render NavBarRoot')

    /*LAYOUT*/
    const handleClick = useLayout({region: props.region});
    /*LAYOUT*/

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
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarRoot)