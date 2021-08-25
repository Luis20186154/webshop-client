import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContex';

const PrivateRoute = ({ children, ...remainingProperties }: any) => {
    const { authState } = React.useContext(AuthContext);
    if (authState.isLogged && authState.role === 'client') {
        return <Route {...remainingProperties}>{children}</Route>
    } else {
        return <Redirect to="/" />
    }
}

export default PrivateRoute;