import { takeLatest, all } from 'redux-saga/effects';
import { LOGIN_USER } from '../ducks/user.ducks';
import { loginRequest } from './user.requests';

// LOGIN_USER action - watcherSaga
function* loginUserWatcher() {
    yield takeLatest(LOGIN_USER, loginRequest);
}

// export root saga
export default function* watcherSaga() {
    yield all([
        loginUserWatcher(),
        // add other sagas here
    ]);
};