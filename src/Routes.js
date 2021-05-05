import React, {useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Context } from './services/ConfigProvider';

// Route components
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

import constants from './constants';

// Protected routes
const PrivateRoute = ({component: Component, path, ...rest}) => {
    const {auth} = useContext(Context);
    
    return (
        (auth) ?
            (<Route path={path} {...rest} render={(props) => (<Component {...props} />)} />) :
            (<Redirect to={constants.ROUTES.LOGIN}></Redirect>)
    )
}

// Restrict user from accessing logged out routes when logged in
const LoggedOutOnlyRoute = ({ component: Component, path, ...rest }) => {
    const {auth} = useContext(Context);
    
    const isLoggedOutOnly = path === constants.ROUTES.LOGIN || constants.ROUTES.REGISTER;
    return (
        (auth && isLoggedOutOnly) ?
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