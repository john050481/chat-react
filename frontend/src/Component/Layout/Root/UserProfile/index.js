import './style.css'
import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Profile from './Profile';
import Credential from './Credential';

export default function (props) {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="profile" title="Profile">
                <Profile />
            </Tab>
            <Tab eventKey="credential" title="Credential">
                <Credential />
            </Tab>
        </Tabs>
    )
}