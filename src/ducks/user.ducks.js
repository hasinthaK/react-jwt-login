
// Action types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_AUTH = 'SET_AUTH';

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

// initial state
const initialState = {
    user: null,
    token: null,
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return { ...state, ...action.payload }
        case LOGOUT_USER:
            return { ...state, user: null, token: null }
        default:
            return state;
    }
};

