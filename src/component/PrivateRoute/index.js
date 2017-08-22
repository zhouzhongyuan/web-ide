import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
        <Route
            {...rest}
            render={props => (isAuthenticated ?
                <Component {...props} /> :
                (<Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />))}
        />
    );
PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
        hash: PropTypes.string,
        key: PropTypes.string,
    }).isRequired,
};
export default PrivateRoute;
