
// Action types
export const LOADER = 'LOADER';

// action creators
export const toggleLoader = (loader) => ({
    type: LOADER,
    payload: { request: loader.request || 'app', loading: loader.loading || false }
});

// initial state
const initialState = {
    request: 'app',
    loading: false
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOADER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

