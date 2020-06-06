import './style.css'
import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Profile from '../../../Profile';
import Credential from './Credential';
import CheckDbFirebase from '../../../_Temp/CheckDbFirebase';

export default function (props) {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="profile" title="Profile">
                <Profile />
            </Tab>
            <Tab eventKey="credential" title="Credential">
                <Credential />
            </Tab>
            <Tab eventKey="checkDbFirebase" title="CheckDbFirebase">
                <CheckDbFirebase />
            </Tab>
        </Tabs>
    )
}