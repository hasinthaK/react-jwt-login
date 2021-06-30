import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// Route components
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

import constants from './constants';

// Protected routes
const PrivateRoute = ({ component: Component, path, ...rest }) => {

    const authState = useSelector(state => state.auth.user);
    
    return (
        (authState) ?
            (<Route path={path} {...rest} render={(props) => (<Component {...props} />)} />) :
            (<Redirect to={constants.ROUTES.LOGIN}></Redirect>)
    )
}

// Restrict user from accessing logged out routes when logged in
const LoggedOutOnlyRoute = ({ component: Component, path, ...rest }) => {
    const authState = useSelector(state => state.auth.user);
    
    const isLoggedOutOnly = path === constants.ROUTES.LOGIN || constants.ROUTES.REGISTER;
    return (
        (authState && isLoggedOutOnly) ?
            (<Redirect to={constants.ROUTES.PROFILE}></Redirect>) :
            (<Route path={path} {...rest} render={(props) => (<Component {...props} />)} />)
    )
}

  
const Routes = () => {

    return (
        <Router>

            <Switch>
                <PrivateRoute path={constants.ROUTES.PROFILE} component={Profile} />
                <LoggedOutOnlyRoute path={constants.ROUTES.LOGIN} component={Login} />
                <Route path={constants.ROUTES.HOME} render={(props) => (<Home {...props} />)} />
            </Switch>

        </Router>
    )

}

export default Routes;