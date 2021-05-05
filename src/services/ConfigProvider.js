import React, { useState, useEffect } from 'react';
import { getAuth } from './LoginService';
import constants from '../constants';

export const Context = React.createContext(null);

// init the current local auth state from the browser if any
const initAuth = () => {    
    const localAuth = getAuth();
    if (localAuth) return localAuth[constants.USER];
    
    return null;
}

const currentAuth = initAuth();

const ConfigProvider = ({children}) => {

    const [data, setData] = useState({});
    const [auth, setAuth] = useState(currentAuth);

    useEffect(() => {
        checkAndSetAuth();

        function checkAndSetAuth() {
            const appAuth = getAuth();
            console.log('Provider: ', appAuth);
            if (appAuth) {
                setAuth(appAuth[constants.USER]);
            }
        }
    }, [])

    return (
        <Context.Provider value={{data, setData, auth, setAuth}}>
            {children}
        </Context.Provider>
    )
}

export default ConfigProvider;