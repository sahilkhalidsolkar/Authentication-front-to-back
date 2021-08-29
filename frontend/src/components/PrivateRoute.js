import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import authContext from '../context/auth/AuthContext';
import Login from './Login';

function PrivateRoute({ component: Component, ...rest }) {
    const { userDetails } = useContext(authContext);
    return (
        <Route
            {...rest}
            render={() => {
                return (userDetails ? <Component /> : <Login />)
            }}

        />
    )
}

export default PrivateRoute
