import React from 'react';
import {useAuth} from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';

function useRequireAuth(WrappedComponent, redirectUrl) {
    return function WithAuthorization(props) {
        console.log('Render WithAuthorization HOC/hook');
        const auth = useAuth();

        if (!auth.user) {
            if (!redirectUrl) return null;
            return <Redirect to={redirectUrl} />;
        }
        return <WrappedComponent {...props} />
    }
};

export default useRequireAuth;
