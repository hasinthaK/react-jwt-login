import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// reducers
import userReducer from './ducks/user.ducks';
import loadingReducer from './ducks/loading.ducks';

// persist reducer config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // only persist 'auth' state in offline storage
}

// root reducer for all redux reducers
// add other app reducers here
const rootReducer = combineReducers({
    auth: userReducer,
    loader: loadingReducer
});

// create persist reducer with rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware
const sagaMiddleware = createSagaMiddleware();

// add all the middleware here
const middleware = [sagaMiddleware];

// redux store & persist store
const store = createStore(persistedReducer, {}, applyMiddleware(...middleware));
export const persistor = persistStore(store);

// start watcherSaga for saga actions
sagaMiddleware.run(rootSaga);

// default export redux store
export default store;