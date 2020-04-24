import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import {hideAlert} from '../../redux/actions'
import "./style.css"

function AlertApp(props) {
    return (
        <React.Fragment>
            {props.text
             ? <Alert className='alert-component' {...props.options} onClose={() => props.hideAlert()} dismissible>
                   {props.text}
               </Alert>
             : null}
        </React.Fragment>
    )
}

AlertApp.defaultProps = {
    text: '',
    options: { variant: 'danger' }
}

AlertApp.propTypes = {
    text: PropTypes.string,
    options: PropTypes.object
}

const mapStateToProps = store => {
    return {
        text: store.app.alert.text,
        options: store.app.alert.options
    }
}
const mapDispatchToProps = {
    hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertApp)