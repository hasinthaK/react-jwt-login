import { call, put } from 'redux-saga/effects';
import { toggleLoader } from '../ducks/loading.ducks';
import { setAppAuth } from '../ducks/user.ducks';
import { post } from '../services/Api';

// LOGIN_USER handler
export function* loginRequest(action) {
    try {
        // start loader
        yield put(toggleLoader({ request: 'app', loading: true }));
        const loginResponse = yield call(() => post('/users', { body: { ...action.payload } }));
        yield put(setAppAuth({ token: 'Token', user: loginResponse }));
    } catch (e) {
        console.error(e);
    }
    // stop loader
    yield put(toggleLoader({ request: 'app', loading: false }));
}