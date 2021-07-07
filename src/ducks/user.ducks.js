
// Action types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_AUTH = 'SET_AUTH';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

// action creators
export const loginUser = (credentials) => ({
    type: LOGIN_USER,
    payload: { ...credentials }
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const setAppAuth = (userAuth) => ({
    type: SET_AUTH,
    payload: { ...userAuth }
});

export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    payload: error
});

export const clearAuthError = () => ({
    type: CLEAR_AUTH_ERROR,
});

// initial state
const initialState = {
    user: null,
    token: null,
    error: null,
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return { ...state, ...action.payload }
        case SET_AUTH_ERROR:
            return { ...state, error: action.payload }
        case CLEAR_AUTH_ERROR:
            return { ...state, error: null }
        case LOGOUT_USER:
            return { ...state, user: null, token: null }
        default:
            return state;
    }
};

