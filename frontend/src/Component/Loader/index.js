import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

function LoaderApp({visible, options, ...props}) {
    return (
        <React.Fragment>
            {visible
             ? <Spinner animation="border" {...options} {...props} />
             : null}
        </React.Fragment>
    )
}

LoaderApp.defaultProps = {
    visible: false,
    options: { variant: 'danger' }
}

LoaderApp.propTypes = {
    visible: PropTypes.bool,
    options: PropTypes.object
}

const mapStateToProps = store => {
    return {
        visible: store.app.loader.visible,
        options: store.app.loader.options
    }

}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderApp)