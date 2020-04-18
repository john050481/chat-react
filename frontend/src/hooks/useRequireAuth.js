import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const RequireAuth = (WrappedComponent, redirectUrl='/auth') => {
    class WithAuthorization extends React.Component {
        static propTypes = {
            isAuth: PropTypes.bool
        };

        render() {
            const { isAuth } = this.props;

            if (!isAuth) {
                if (!redirectUrl) return null;
                return <Redirect to={redirectUrl} />;
            }
            return <WrappedComponent {...this.props}/>;
        }
    }
    return WithAuthorization;
};

export default RequireAuth;
