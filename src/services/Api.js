import constants from '../constants';

const API_BASE = constants.API_BASE;

/**
 * Unauthenticated GET request
 * @param {string} url 
 * @param {object} options 
 * @returns - object
 */
export const get = async (url, options = {}) => {
    const response = await fetch(`${API_BASE}${url}`, {
        ...options,
        method: 'GET'
    });
    if (response.ok)
        return response.json();
    
    const message = await response.text();
    throw new Error(message);
}

/**
 * Unauthenticated POST request,
 * Request body could be `Json | string | FormData`
 * Content type header defualts to `application/json`.
 * @param {string} url 
 * @param {object} options 
 * @returns - object
 */
export const post = async (url, options = {}) => {
    console.log('POST op: ', options);
    const response = await fetch(`${API_BASE}${url}`, {
        headers: { 'Content-type': 'application/json', ...options.headers },
        ...options,
        body: (options.body instanceof Object)? JSON.stringify(options.body) : options.body,
        method: 'POST'
    });

    if (response.ok)
        return response.json();
    
    const message = await response.text();
    throw new Error(message);
}

/**
 * Initiates an authenticated request. Throws an error if no auth. 
 * Request method defaults to `GET` if no other provided in the options.
 * @param {string} url 
 * @param {object} options 
 * @returns - object
 */
export const authReq = async (url, options = { method: 'GET' }) => {
    let authStatus = null;
    // try to get & parse local auth state
    try {
        authStatus = JSON.parse(localStorage.getItem('persist:root'));
    } catch (e) {
        console.error(e);
    }

    if (!authStatus) return new Error('You are not logged in!');

    // fetch only if auth status available
    const response = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${authStatus[constants.TOKEN]}`
        }
    });

    if (response.ok)
        return response.json();
    
    const message = await response.text();
    throw new Error(message);
}