import React, {useState} from 'react'
import './style.css'
import PropTypes from 'prop-types';

import UpperLayer from '../UpperLayer'

export default function Main(props) {
    console.log('Render MAIN', props.region);

    return (
        <div className="container-app clearfix">
            <UpperLayer region={props.region}>
                {props.children}
            </UpperLayer>
        </div>
    )
}

Main.propTypes = {
    region: PropTypes.string.isRequired
}
