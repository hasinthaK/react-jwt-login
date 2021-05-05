import constants from '../constants';
import { get, post } from './Api';

/**
 * Returns the user local auth status
 * @returns - { token: string, user: object } | null
 */
export const getAuth = () => {
    console.log('Gettting auth');
    const token = localStorage.getItem(constants.TOKEN);
    const user = localStorage.getItem(constants.USER);

    if (!token || !user)
        return null;
    
    return {
        token,
        user: JSON.parse(user)
    }
}

/**
 * Set local auth status
 * @param {object} user 
 * @param {string} token 
 */
const setAuth = (user, token) => {
    localStorage.setItem(constants.USER, JSON.stringify(user));
    localStorage.setItem(constants.TOKEN, token);
}

/**
 * Executes login & set the local auth status in the client browser.
 * If unsuccessfull, 401 | error http status will be thrown from the server.
 * On success, user data object will be returned after setting local auth status.
 * @param {{email: string, password: string}} loginCredentials 
 */
export const login = async (loginCredentials) => {
    const loginResponse = await post('/user/login', { body: loginCredentials });
    console.log('Login res:', loginResponse);
    const userData = await get('/user', {
        headers: {Authorization: `Bearer ${loginResponse[constants.TOKEN]}`}
    });

    setAuth(userData, loginResponse[constants.TOKEN]);
    return userData;
}

export const logout = () => {
    localStorage.clear();
}